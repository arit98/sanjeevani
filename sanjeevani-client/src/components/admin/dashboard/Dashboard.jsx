import React, { useState } from 'react';
import WelcomeBanner from '../dashboard/partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../dashboard/partials/dashboard/DashboardAvatars';
import DashboardCard01 from '../dashboard/partials/dashboard/DashboardCard01';
import DashboardCard02 from '../dashboard/partials/dashboard/DashboardCard02';
import DashboardCard03 from '../dashboard/partials/dashboard/DashboardCard03';
import DashboardCard04 from '../dashboard/partials/dashboard/DashboardCard04';
import DashboardCard05 from '../dashboard/partials/dashboard/DashboardCard05';
import DashboardCard06 from '../dashboard/partials/dashboard/DashboardCard06';
import DashboardCard07 from '../dashboard/partials/dashboard/DashboardCard07';
import DashboardCard08 from '../dashboard/partials/dashboard/DashboardCard08';
import DashboardCard09 from '../dashboard/partials/dashboard/DashboardCard09';
import DashboardCard10 from '../dashboard/partials/dashboard/DashboardCard10';
import DashboardCard11 from '../dashboard/partials/dashboard/DashboardCard11';
import DashboardCard12 from '../dashboard/partials/dashboard/DashboardCard12';
import DashboardCard13 from '../dashboard/partials/dashboard/DashboardCard13';

function Dashboard() {

  return (
    <div className="flex h-screen overflow-hidden -mr-52">

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-hidden overflow-x-hidden">

        {/*  Site header */}

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-[1200px] mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Avatars */}
              <DashboardAvatars />

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              {/* Line chart (Acme Plus) */}
              <DashboardCard01 />
              {/* Line chart (Acme Advanced) */}
              <DashboardCard02 />
              {/* Line chart (Acme Professional) */}
              <DashboardCard03 />
              {/* Bar chart (Direct vs Indirect) */}
              <DashboardCard04 />
              {/* Line chart (Real Time Value) */}
              <DashboardCard05 />
              {/* Doughnut chart (Top Countries) */}
              <DashboardCard06 />
              {/* Table (Top Channels) */}
              <DashboardCard07 />
              {/* Line chart (Sales Over Time) */}
              <DashboardCard08 />
              {/* Stacked bar chart (Sales VS Refunds) */}
              <DashboardCard09 />
              {/* Card (Customers) */}
              <DashboardCard10 />
              {/* Card (Reasons for Refunds) */}
              <DashboardCard11 />
              {/* Card (Recent Activity) */}
              <DashboardCard12 />
              {/* Card (Income/Expenses) */}
              <DashboardCard13 />
              
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;