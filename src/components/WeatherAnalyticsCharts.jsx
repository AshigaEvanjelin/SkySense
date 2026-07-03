import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

function WeatherAnalyticsCharts({ hourlyData }) {
  const chartItems = hourlyData.slice(0, 12)

  return (
    <div className="charts-grid">
      <article className="chart-card glass-card" aria-label="Temperature trend chart">
        <div className="chart-header">
          <p className="chart-overline">Temperature Trend</p>
          <h4>Hourly °C</h4>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartItems} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: '#d7d7e0', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#d7d7e0', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(18, 25, 47, 0.95)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }} />
            <Line type="monotone" dataKey="temperature" stroke="#7c5cff" strokeWidth={3} dot={{ r: 3, fill: '#7c5cff' }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </article>

      <article className="chart-card glass-card" aria-label="Humidity trend chart">
        <div className="chart-header">
          <p className="chart-overline">Humidity Trend</p>
          <h4>Hourly %</h4>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartItems} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#36d6ae" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#36d6ae" stopOpacity={0.08} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: '#d7d7e0', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#d7d7e0', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(18, 25, 47, 0.95)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }} />
            <Area type="monotone" dataKey="humidity" stroke="#36d6ae" fill="url(#humidityGradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </article>

      <article className="chart-card glass-card" aria-label="Wind speed trend chart">
        <div className="chart-header">
          <p className="chart-overline">Wind Trend</p>
          <h4>Hourly km/h</h4>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartItems} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: '#d7d7e0', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#d7d7e0', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(18, 25, 47, 0.95)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }} />
            <Line type="monotone" dataKey="wind" stroke="#ff8a65" strokeWidth={3} dot={{ r: 3, fill: '#ff8a65' }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </article>

      <article className="chart-card glass-card" aria-label="Rain probability chart">
        <div className="chart-header">
          <p className="chart-overline">Rain Probability</p>
          <h4>Hourly %</h4>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartItems} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: '#d7d7e0', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#d7d7e0', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(18, 25, 47, 0.95)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }} />
            <Bar dataKey="rainChance" fill="#5b8cff" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </article>

      <article className="chart-card glass-card" aria-label="UV index trend chart">
        <div className="chart-header">
          <p className="chart-overline">UV Index Trend</p>
          <h4>Hourly UV</h4>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartItems} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: '#d7d7e0', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#d7d7e0', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(18, 25, 47, 0.95)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }} />
            <Line type="monotone" dataKey="uv" stroke="#ffcc33" strokeWidth={3} dot={{ r: 3, fill: '#ffcc33' }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </article>
    </div>
  )
}

export default WeatherAnalyticsCharts
