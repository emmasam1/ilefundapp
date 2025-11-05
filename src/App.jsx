import { Routes, Route } from "react-router";
import "./App.css";
import Login from "./pages/auth/login/Login";
import Template from "./pages/auth/login/Template";
import EnterPin from "./pages/auth/login/EnterPin";
import Register from "./pages/auth/register/Register";
import Pin from "./pages/auth/register/Pin";
import Country from "./pages/auth/register/Country";
import Success from "./pages/auth/register/Success";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import InactiveDashboard from "./components/inactive/InactiveDashboard";
import RegSuccess from "./pages/auth/register/RegSuccess";
import FaceId from "./pages/auth/register/FaceId";
import VerifyIdentity from "./pages/auth/register/VerifyIdentity";
import Congrats from "./pages/auth/register/Congrats";
import CardDetails from "./pages/add card/CardDetails";
import ChoosePlan from "./pages/plan/ChoosePlan";
import SavePlanForm from "./pages/plan/SavePlanForm";
import Wallet from "./pages/dashboard/Wallet";
import HomeFund from "./pages/dashboard/HomeFund";
import RainyDay from "./pages/dashboard/RainyDay";
import Bailing from "./pages/dashboard/Bailing";
import TopUp from "./pages/topUp/TopUp";
import Withdrawal from "./pages/Withdrawal/Withdrawal";
import Listing from "./pages/dashboard/Listing";
import Details from "./components/list details/Details";
import InitialDeposit from "./components/list details/InitialDeposit";
import Summary from "./components/list details/Summary";
import PayOutright from "./components/list details/PayOutright";
import Goals from "./pages/dashboard/Goals";
import GoalDetails from "./components/goals/GoalDetails";
import Profile from "./pages/profile/Profile";
import Personal from "./pages/profile/Personal";
import EditProfile from "./pages/profile/EditProfile";
import AddCard from "./pages/profile/AddCard";
import SecuritySettings from "./pages/profile/SecuritySettings";
import NotificationSettings from "./pages/profile/NotificationSettings";
import NextOfKin from "./pages/profile/NextOfKin";
import ChangePassword from "./pages/profile/ChangePassword";
import TransactionHistory from "./pages/profile/TransactionHistory";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/continue-to-signin" element={<Template />} />
      <Route path="/enter-pin" element={<EnterPin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/enter-confirmation-pin" element={<Pin />} />
      {/* <Route path="/continue-to-select-country" element={<Country />} /> */}
      <Route path="/success" element={<Success />} />
      <Route path="/personal-information" element={<InactiveDashboard />} />
      <Route path="/registration-success" element={<RegSuccess />} />
      <Route path="/register-face-id" element={<FaceId />} />
      <Route path="/register-verify-identity" element={<VerifyIdentity />} />
      <Route path="/register-completed" element={<Congrats />} />
      <Route path="/card-details" element={<CardDetails />} />
      <Route path="/choose-plan" element={<ChoosePlan />} />
      <Route path="/choose-savings-method" element={<SavePlanForm />} />
      <Route path="/top-up-account" element={<TopUp />} />
      <Route path="/Withdraw-funds" element={<Withdrawal />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="" element={<Dashboard />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="goals" element={<Goals />} />
        <Route path="wallet/home-fund" element={<HomeFund />} />
        <Route path="wallet/rainy-day" element={<RainyDay />} />
        <Route path="wallet/balling" element={<Bailing />} />
        <Route path="listing" element={<Listing />} />
        <Route path="listing/details" element={<Details />} />
        <Route path="listing/initial-deposit" element={<InitialDeposit />} />
        <Route path="listing/pay-outright" element={<PayOutright />} />
        <Route path="listing/listing-summary" element={<Summary />} />
        <Route path="goals/goal-detail/:id" element={<GoalDetails />} />
        <Route path="profile" element={<Profile />} />

        <Route path="profile/personal" element={<Personal />} />
        <Route path="profile/edit-profile" element={<EditProfile />} />
        <Route path="profile/banks" element={<AddCard />} />
        <Route path="profile/privacy" element={<SecuritySettings />} />
        <Route path="profile/notifications-settings" element={<NotificationSettings />} />
        <Route path="profile/nextofkin" element={<NextOfKin />} />
        <Route path="profile/change-password" element={<ChangePassword />} />
        <Route path="profile/transaction-history" element={<TransactionHistory />} />
      </Route>
    </Routes>
  );
}

export default App;
