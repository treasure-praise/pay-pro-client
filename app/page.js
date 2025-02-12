import Dashboard from "@/components/dashboard"
import KYCVerification from "@/components/kyc-verification"
import LoginForm from "@/components/login-form"
import OnboardingFlow from "@/components/onboardings"
import Profile from "@/components/profile"
import SaveMoney from "@/components/save-money"
import SavingsFlow from "@/components/savings-flow"
import SignUpFlow from "@/components/sign-up"
import SuccessModal from "@/components/success-modal"
import { TransactionsList } from "@/components/transactions-list"

export default function Home() {
  return (
    // <main className="min-h-screen bg-gray-50">
    //   {/* <LoginForm /> */}
    //   {/* <Dashboard/> */}
    //   {/* <Profile/> */}
    //   {/* <KYCVerification/> */}
    //   {/* <SignUpFlow/>  */}
    //   {/* <OnboardingFlow/> */}
    //   {/* <SaveMoney/>   */}
    //   {/* <SuccessModal/> */}
    //   {/* <SavingsFlow/> */}
    // </main>
  //   <div className="container max-w-md mx-auto p-4 space-y-6">
  //   <h1 className="text-2xl font-bold">Transactions</h1>
  //   <TransactionsList />
  // </div>
  <OnboardingFlow/>
  )
}

