import React from 'react';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { BarChart2 } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function PerformanceMetrics({ metrics }) {
  const chartData = {
    labels: ['APCE', 'Semantic Accuracy', 'Color Consistency', 'Edge Preservation'],
    datasets: [
      {
        label: 'Performance Metrics',
        data: [
          metrics.apce * 100, 
          metrics.semanticAccuracy * 100, 
          metrics.colorConsistency * 100, 
          metrics.edgePreservation * 100
        ],
        backgroundColor: [
          'rgba(30, 64, 175, 0.7)',  // thermal-primary blue
          'rgba(16, 185, 129, 0.7)', // thermal-secondary green
          'rgba(99, 102, 241, 0.7)', // thermal-accent indigo
          'rgba(234, 179, 8, 0.7)'   // amber for variety
        ],
        borderColor: [
          'rgba(30, 64, 175, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(99, 102, 241, 1)',
          'rgba(234, 179, 8, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-thermal-card p-6">
      <div className="flex items-center mb-4">
        <BarChart2 className="mr-3 text-thermal-primary" size={24} />
        <h2 className="text-2xl font-bold text-thermal-primary">
          Performance Metrics
        </h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-1">
          <Bar data={chartData} options={chartOptions} />
        </div>
        
        <div className="md:col-span-1 grid grid-cols-2 gap-4">
          {Object.entries(metrics).map(([key, value]) => (
            <div 
              key={key} 
              className="
                bg-gray-100 p-4 rounded-lg 
                flex flex-col items-center justify-center
                hover:bg-gray-200 transition-colors
              "
            >
              <span className="text-sm text-gray-600 capitalize mb-1">
                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </span>
              <span className="text-2xl font-bold text-thermal-primary">
                {(value * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PerformanceMetrics;