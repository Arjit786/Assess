import { CreditCard, Zap } from 'lucide-react';

export default function Credits() {
  const credits = {
    used: 1,
    total: 20,
    plan: 'Free'
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Credits & Usage</h1>

      {/* Credit Counter */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Available Credits</h2>
          <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
            {credits.plan} Plan
          </span>
        </div>

        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block text-blue-600">
                {credits.used}/{credits.total} Credits Used
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-blue-600">
                {((credits.used / credits.total) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
            <div
              style={{ width: `${(credits.used / credits.total) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            ></div>
          </div>
        </div>
      </div>

      {/* Upgrade CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white/10 rounded-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Upgrade to Pro</h3>
            <p className="text-blue-100 mb-4">
              Get unlimited assessments, advanced analytics, and premium features
            </p>
            <ul className="space-y-2 mb-6 text-sm text-blue-100">
              <li className="flex items-center">
                <span className="mr-2">✓</span> Unlimited assessments
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> Advanced analytics and reporting
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> Custom branding options
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> Priority support
              </li>
            </ul>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white">
              <CreditCard className="w-4 h-4 mr-2" />
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}