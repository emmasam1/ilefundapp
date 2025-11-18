import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();
const SECRET_KEY = "ilefund-super-secure-key-256bit"; // 32 chars = 256 bits

export const AppProvider = ({ children }) => {
  const API_BASE_URL = "https://wallet-v2-aeqw.onrender.com/api/v1";
  const EST_URL ="https://wallet-v2-aeqw.onrender.com"
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // --- 🔐 Key Generation ---
  const getKey = async () => {
    const encoder = new TextEncoder();
    const keyBytes = encoder.encode(SECRET_KEY);
    const paddedKey = new Uint8Array(32);
    paddedKey.set(keyBytes.slice(0, 32));
    return await crypto.subtle.importKey(
      "raw",
      paddedKey,
      { name: "AES-GCM" },
      false,
      ["encrypt", "decrypt"]
    );
  };

  // --- 🔐 Encrypt Data ---
  const encryptData = async (data) => {
    try {
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const key = await getKey();
      const encoded = new TextEncoder().encode(JSON.stringify(data));
      const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);

      const ivStr = btoa(String.fromCharCode(...iv));
      const dataStr = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
      return `${ivStr}.${dataStr}`;
    } catch (error) {
      console.error("Encryption failed:", error);
      return null;
    }
  };

  // --- 🔐 Decrypt Data ---
  const decryptData = async (encryptedData) => {
    try {
      const [ivStr, dataStr] = encryptedData.split(".");
      const iv = Uint8Array.from(atob(ivStr), (c) => c.charCodeAt(0));
      const encryptedBytes = Uint8Array.from(atob(dataStr), (c) => c.charCodeAt(0));
      const key = await getKey();

      const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encryptedBytes);
      return JSON.parse(new TextDecoder().decode(decrypted));
    } catch (error) {
      console.error("Decryption failed:", error);
      return null;
    }
  };

  // ✅ Save token + user securely
  const saveAuthData = async (data) => {
    try {
      const tokenValue = (data?.token || data?.accessToken || "").trim();
      const userValue = data?.user || null;

      if (tokenValue) {
        const encryptedToken = await encryptData(tokenValue);
        if (encryptedToken) {
          sessionStorage.setItem("token", encryptedToken);
          setToken(tokenValue);
        }
      }

      if (userValue) {
        const encryptedUser = await encryptData(userValue);
        if (encryptedUser) {
          sessionStorage.setItem("user", encryptedUser);
          setUser(userValue);
        }
      }

      console.log("✅ Auth data encrypted and saved.");
    } catch (error) {
      console.error("Error saving auth data:", error);
    }
  };

  // ✅ Remove both token + user
  const removeAuthData = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  // ✅ Logout from API and clear session
  const logout = async () => {
    if (!token) return removeAuthData();

    try {
      const res = await axios.post(
        `${API_BASE_URL}/logout`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        console.log("✅ Successfully logged out from server");
      } else {
        console.warn("⚠️ Logout request failed:", res.status);
      }
    } catch (error) {
      console.error("❌ Logout error:", error.response?.data || error.message);
    } finally {
      removeAuthData();
    }
  };

  // ✅ Load and decrypt on mount
  useEffect(() => {
    (async () => {
      const storedToken = sessionStorage.getItem("token");
      const storedUser = sessionStorage.getItem("user");

      if (storedToken) {
        const decryptedToken = await decryptData(storedToken);
        setToken(decryptedToken);
      }

      if (storedUser) {
        const decryptedUser = await decryptData(storedUser);
        setUser(decryptedUser);
      }

      setInitialized(true);
    })();
  }, []);

  const getToken = () => token;
  const getUser = () => user;

  if (!initialized) return null;

  return (
    <AppContext.Provider
      value={{
        API_BASE_URL,
        EST_URL,
        token,
        user,
        setAuthData: saveAuthData,
        removeAuthData,
        logout,
        getToken,
        getUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
