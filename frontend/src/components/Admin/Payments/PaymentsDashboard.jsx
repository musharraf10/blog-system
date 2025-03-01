import { Share, Search, Settings, Calendar } from 'lucide-react';
import BarGraph from './BarGraph';
import { useState } from 'react';
// Sample data for charts
const monthlyData = [
  { name: 'Aug', value: 2000 },
  { name: 'Jul', value: 3500 },
  { name: 'Aug', value: 3000 },
  { name: 'Sep', value: 3800 },
  { name: 'Dec', value: 3200 },
  { name: 'Feb', value: 3900 },
];

const barData = [
  { month: '1', value: 20 },
  { month: '2', value: 25 },
  { month: '3', value: 45 },
  { month: '4', value: 30 },
  { month: '5', value: 55 },
  { month: '6', value: 35 },
  { month: '7', value: 60 },
];

// Reusable card component with a clean black and white design
const CardWrapper = ({ children, className = '' }) => (
  <div
    className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 
    transition-all duration-300 hover:shadow-md ${className}`}
  >
    {children}
  </div>
);

const PaymentsDashboard = () => {
  const [today, setToday] = useState(123456);
  const [sixmonthsData, setSixmonthsData] = useState(54783658);
  const [monthly, setMonthly] = useState(34.56836);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm">
        <div className="grid h-full grid-cols-6">
          {/* Sidebar */}

          <CardWrapper className="h-full col-span-1 border-r border-gray-200 rounded-none">
            <div className="mb-6">
              <h2 className="mb-4 font-semibold text-black">Generic</h2>
              <nav className="space-y-4">
                <div className="flex items-center gap-3 p-2 text-gray-600 bg-gray-100 rounded-lg">
                  <Calendar size={18} />
                  <span>Monthly</span>
                </div>
              </nav>
            </div>
          </CardWrapper>

          {/* Main Content */}
          <div className="col-span-5 p-6 bg-gray-50 max-w-[100vw]">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-4">
                <button className="px-4 py-2 text-white transition-all duration-300 bg-black rounded-lg hover:bg-gray-800">
                  PaymentsDashboard
                </button>
              </div>
              <div className="flex gap-6 text-gray-600">
                <Share
                  size={20}
                  className="transition-colors cursor-pointer hover:text-black"
                />
                <Settings
                  size={20}
                  className="transition-colors cursor-pointer hover:text-black"
                />
                <Search
                  size={20}
                  className="transition-colors cursor-pointer hover:text-black"
                />
              </div>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <CardWrapper>
                <div className="text-sm text-gray-600">Basic User Revenue</div>
                <div className="text-2xl font-bold text-black">20,51305</div>
              </CardWrapper>
              <CardWrapper>
                <div className="text-sm text-gray-600">Pro Premium Revenue</div>
                <div className="text-2xl font-bold text-black">20,51305</div>
              </CardWrapper>
              <CardWrapper>
                <div className="text-sm text-gray-600">Features</div>
                <div className="text-2xl font-bold text-black">1</div>
              </CardWrapper>
              <CardWrapper>
                <div className="text-sm text-gray-600">Month</div>
                <div className="text-2xl font-bold text-black">325%</div>
                <div className="text-xs text-gray-600">Last month</div>
              </CardWrapper>
            </div>

            {/* Middle Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <CardWrapper>
                <div className="text-sm text-gray-600">Today Revenue</div>
                <div className="text-3xl font-bold text-black">{today}</div>
                <div className="text-xs text-gray-600">Last / Series</div>
              </CardWrapper>
              <CardWrapper>
                <div className="text-sm text-gray-600">Six Months</div>
                <div className="text-3xl font-bold text-black">
                  {sixmonthsData}
                </div>
                <div className="text-xs text-gray-600">Pro 1 Series</div>
              </CardWrapper>
              <CardWrapper>
                <div className="flex items-center justify-between">
                  <div className="px-3 py-1 text-sm text-black bg-gray-200 rounded-full">
                    Last / Month
                  </div>
                  <div className="text-sm text-gray-600">Last Monthly</div>
                </div>
                <div className="flex items-end gap-2 mt-2">
                  <div className="text-3xl font-bold text-black">{monthly}</div>

                  <div className="mb-1 text-gray-600">Type</div>
                </div>
              </CardWrapper>
            </div>

            {/* Bottom Charts - Stacked */}

            <BarGraph barData={barData} monthlyData={monthlyData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsDashboard;
