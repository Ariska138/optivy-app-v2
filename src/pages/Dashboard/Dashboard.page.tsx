import { WelcomeBanner } from './components/WelcomeBanner';
import { ActivityChart } from './components/ActivityChart';
import { Card } from './components/Card';
import { ProjectCard } from './components/ProjectCard';
import { RightSidebar } from './components/RightSidebar';
import { dashboardProjects } from '../../constants/data';

const DashboardPage = () => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="mt-6 mr-6 flex justify-end">
        <button className="flex items-center bg-orange-400 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-orange-500 transition">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          Aug - Des 2021
        </button>
      </div>
      <div className="flex-1 p-6 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <WelcomeBanner />
          <ActivityChart />
          <Card title="Project" className="col-span-12">
            <div className="space-y-4">
              {dashboardProjects.map((proj) => (
                <ProjectCard key={proj.title} project={proj} />
              ))}
            </div>
          </Card>
        </div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default DashboardPage;

