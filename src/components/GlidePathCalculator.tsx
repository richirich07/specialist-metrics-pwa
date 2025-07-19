"use client";

import { useState, FormEvent } from "react";

interface WeekResult {
  week: number;
  cumulative: number;
  weeklyIncrease: number;
}

export default function GlidePathCalculator() {
  const [currentMetric, setCurrentMetric] = useState<string>("");
  const [targetMetric, setTargetMetric] = useState<string>("");
  const [weeks, setWeeks] = useState<string>("");
  const [results, setResults] = useState<WeekResult[]>([]);
  const [error, setError] = useState<string>("");
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const calculateGlidePath = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setResults([]);
    setIsCalculated(false);

    // Validate inputs
    const current = parseFloat(currentMetric);
    const target = parseFloat(targetMetric);
    const numWeeks = parseInt(weeks);

    if (isNaN(current) || isNaN(target) || isNaN(numWeeks)) {
      setError("Please enter valid numbers for all fields.");
      return;
    }
    
    if (numWeeks <= 0) {
      setError("Number of weeks must be greater than zero.");
      return;
    }
    
    if (target <= current) {
      setError("Target metric must be greater than the current metric.");
      return;
    }

    // Calculate the incremental improvement required each week
    const totalIncrease = target - current;
    const weeklyIncrease = totalIncrease / numWeeks;
    const glidePath: WeekResult[] = [];
    
    for (let week = 1; week <= numWeeks; week++) {
      glidePath.push({
        week,
        cumulative: parseFloat((current + weeklyIncrease * week).toFixed(2)),
        weeklyIncrease: parseFloat(weeklyIncrease.toFixed(2))
      });
    }
    
    setResults(glidePath);
    setIsCalculated(true);
  };

  const resetForm = () => {
    setCurrentMetric("");
    setTargetMetric("");
    setWeeks("");
    setResults([]);
    setError("");
    setIsCalculated(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <form onSubmit={calculateGlidePath} className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Current Metric Value
            </label>
            <input
              type="number"
              step="0.01"
              value={currentMetric}
              onChange={(e) => setCurrentMetric(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
              placeholder="e.g., 50"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Target Metric Value
            </label>
            <input
              type="number"
              step="0.01"
              value={targetMetric}
              onChange={(e) => setTargetMetric(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
              placeholder="e.g., 100"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Number of Weeks
            </label>
            <input
              type="number"
              min="1"
              value={weeks}
              onChange={(e) => setWeeks(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
              placeholder="e.g., 8"
              required
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-slate-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-slate-800 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Calculate Glide Path
          </button>
          
          {isCalculated && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors duration-200"
            >
              Reset
            </button>
          )}
        </div>
      </form>

      {results.length > 0 && (
        <div className="mt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Your Glide Path Results
            </h2>
            <p className="text-slate-600">
              Weekly increase needed: <span className="font-semibold text-slate-900">
                {results[0]?.weeklyIncrease}
              </span> per week
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-slate-50 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Week</th>
                  <th className="px-6 py-4 text-left font-semibold">Cumulative Target</th>
                  <th className="px-6 py-4 text-left font-semibold">Progress</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr 
                    key={result.week} 
                    className={`border-b border-slate-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                    } hover:bg-slate-100 transition-colors duration-150`}
                  >
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      Week {result.week}
                    </td>
                    <td className="px-6 py-4 text-slate-700 font-medium">
                      {result.cumulative}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-full bg-slate-200 rounded-full h-2 mr-3">
                          <div 
                            className="bg-slate-900 h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${(result.week / results.length) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-slate-600 font-medium">
                          {Math.round((result.week / results.length) * 100)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-slate-100 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Summary</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Starting Value:</span>
                <span className="font-semibold text-slate-900 ml-2">{currentMetric}</span>
              </div>
              <div>
                <span className="text-slate-600">Target Value:</span>
                <span className="font-semibold text-slate-900 ml-2">{targetMetric}</span>
              </div>
              <div>
                <span className="text-slate-600">Total Weeks:</span>
                <span className="font-semibold text-slate-900 ml-2">{weeks}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
