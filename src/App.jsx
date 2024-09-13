import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Campgrounds from "./pages/Campgrounds";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateCampground from "./pages/CreateCampground";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CampgroundDetail from "./pages/CampgroundDetail";

import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./pages/ProtectedRoute";
import UserProfile from "./pages/UserProfile";
import UpdateUserProfile from "./pages/UpdateUserProfile";
import PageNotFound from "./pages/PageNotFound";
import BookingDetail from "./pages/BookingDetail";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route element={<AppLayout />}>
            <Route path="campgrounds" element={<Campgrounds />} />
            <Route path="campgrounds/new" element={<ProtectedRoute><CreateCampground /></ProtectedRoute>} />
            <Route path="campgrounds/:id" element={<CampgroundDetail />} />
            <Route path="profile/:userId" element={<UserProfile />}/>
            <Route path="profile/:userId/update" element={<ProtectedRoute><UpdateUserProfile /></ProtectedRoute>}/>
            <Route path="campgrounds/:id/bookings/:bookingId" element={<ProtectedRoute><BookingDetail /></ProtectedRoute>}/>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="*" element={<PageNotFound />}/>
        </Routes>
      </BrowserRouter>
      <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "white",
              color: "grey",
            },
          }}
        />
    </QueryClientProvider>
  );
}

export default App;
