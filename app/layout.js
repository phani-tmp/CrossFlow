import MobileLayout from "@/components/Layout/MobileLayout";
import { ChatProvider } from '@/context/ChatContext';
import { UserProvider } from '@/context/UserContext';
import { ScheduleProvider } from '@/context/ScheduleContext';
import AuthGuard from '@/components/AuthGuard';
import "./globals.css";

import { NewsProvider } from '@/context/NewsContext';

export const metadata = {
  title: "CrossFlow",
  description: "Healthcare Coordination App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChatProvider>
          <UserProvider>
            <ScheduleProvider>
              <NewsProvider>
                <AuthGuard>
                  <MobileLayout>
                    {children}
                  </MobileLayout>
                </AuthGuard>
              </NewsProvider>
            </ScheduleProvider>
          </UserProvider>
        </ChatProvider>
      </body>
    </html>
  );
}
