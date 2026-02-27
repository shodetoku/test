import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import DashboardSummaryCard from '../../components/patient/dashboard/DashboardSummaryCard';
import NextAppointmentCard from '../../components/patient/dashboard/NextAppointmentCard';
import BpSparkline from '../../components/patient/dashboard/BpSparkline';
import { getCurrentUser } from '../../services/AuthService';
import { getFromStorage } from '../../services/StorageService';
import { mockAppointments } from '../../utils/SampleData';
import '../../assets/styles/PatientDashboard.css';

const JOURNEY_STEPS = ['Booked', 'Arrived', 'Consultation', 'Billing'];

const RECENT_ACTIVITY_ITEMS = [
  {
    id: '1',
    dateLabel: 'Feb 10, 2026',
    description: 'Blood panel completed. Mild cholesterol elevation observed.',
    category: 'Lab'
  },
  {
    id: '2',
    dateLabel: 'Jan 15, 2026',
    description: 'General consultation completed. Lifestyle adjustment plan issued.',
    category: 'Consultation'
  },
  {
    id: '3',
    dateLabel: 'Dec 10, 2025',
    description: 'Annual physical exam with preventive care recommendations.',
    category: 'Consultation'
  },
  {
    id: '4',
    dateLabel: 'Nov 01, 2025',
    description: 'Invoice settled for prior laboratory tests.',
    category: 'Billing'
  }
];

const CONSULTATION_SUMMARY_ITEMS = [
  {
    id: '1',
    doctor: 'Dr. Sarah Johnson',
    summary: 'Continue antihypertensive medications and monitor blood pressure daily.',
    category: 'Consultation'
  },
  {
    id: '2',
    doctor: 'Dr. Michael Chen',
    summary: 'Fast for 8 hours before the next lipid panel. Hydration is allowed.',
    category: 'Consultation'
  },
  {
    id: '3',
    doctor: 'Dr. Emily Rodriguez',
    summary: 'Schedule follow-up in 6 months to review preventive screening results.',
    category: 'Consultation'
  }
];

function PatientDashboard({ onNavigate }) {
  const outletContext = useOutletContext?.() || {};
  const { searchValue = '' } = outletContext;

  const user = getCurrentUser();
  const appointments = getFromStorage('appointments') || mockAppointments;

  const [debouncedSearch, setDebouncedSearch] = useState(searchValue);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 220);

    return () => clearTimeout(handle);
  }, [searchValue]);

  const normalizedQuery = debouncedSearch.trim().toLowerCase();

  const { upcoming, completedCount, pendingLabs } = useMemo(() => {
    const now = new Date();
    const upcomingItems = appointments
      .filter((appointment) => appointment.status === 'confirmed' && new Date(appointment.date) >= now)
      .sort((first, second) => new Date(first.date) - new Date(second.date));

    return {
      upcoming: upcomingItems[0] || null,
      completedCount: appointments.filter((appointment) => appointment.status === 'completed').length,
      pendingLabs: 2
    };
  }, [appointments]);

  const currentJourneyStepIndex = useMemo(() => {
    if (!upcoming) return 2;
    return 1;
  }, [upcoming]);

  const filteredRecentActivity = useMemo(() => {
    if (!normalizedQuery) return RECENT_ACTIVITY_ITEMS;
    return RECENT_ACTIVITY_ITEMS.filter((item) => {
      const haystack = [
        item.dateLabel,
        item.description,
        item.category
      ].join(' ').toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  const filteredConsultations = useMemo(() => {
    if (!normalizedQuery) return CONSULTATION_SUMMARY_ITEMS;
    return CONSULTATION_SUMMARY_ITEMS.filter((item) => {
      const haystack = [
        item.doctor,
        item.summary,
        item.category
      ].join(' ').toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  if (!user) {
    return (
      <section className="dashboard-page">
        <div className="dashboard-empty">
          <h2>Please log in to access your dashboard</h2>
          <button type="button" onClick={() => onNavigate('login')}>Go to Login</button>
        </div>
      </section>
    );
  }

  return (
    <section className="dashboard-page">
      <div className="summary-grid">
        <DashboardSummaryCard className="primary" as="div">
          <NextAppointmentCard appointment={upcoming} onNavigate={onNavigate} />
        </DashboardSummaryCard>

        <DashboardSummaryCard className="warning" as="button" onClick={() => onNavigate('lab-results')}>
          <span className="summary-label">Pending Lab Results</span>
          <strong>{pendingLabs} Action Required</strong>
          <span className="summary-meta">Review flagged values and doctor instructions</span>
        </DashboardSummaryCard>

        <DashboardSummaryCard className="success" as="div">
          <span className="summary-label">BP Trend</span>
          <strong>Last 7 readings: 118–126</strong>
          <span className="summary-meta">Active Meds: 2 · Completed Visits: {completedCount}</span>
          <BpSparkline />
        </DashboardSummaryCard>
      </div>

      <article className="journey-panel">
        <div className="panel-header">
          <h2>Patient Journey Tracker</h2>
          <button type="button" onClick={() => onNavigate('calendar')}>Open Calendar</button>
        </div>
        <div className="journey-stepper horizontal" role="list" aria-label="Appointment journey status">
          {JOURNEY_STEPS.map((step, index) => (
            <div
              key={step}
              className={`journey-step ${
                index < currentJourneyStepIndex
                  ? 'completed'
                  : index === currentJourneyStepIndex
                    ? 'current'
                    : 'upcoming'
              }`}
              role="listitem"
            >
              <span className="step-dot">{index + 1}</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </article>

      <div className="dashboard-columns">
        <article className="dashboard-panel">
          <div className="panel-header">
            <h2>Recent Activity</h2>
            <button type="button" onClick={() => onNavigate('medical-records')}>View Medical Timeline</button>
          </div>
          <ul className="timeline-list">
            {filteredRecentActivity.map((item) => (
              <li key={item.id} className="timeline-item">
                <div className="timeline-item-header">
                  <span className="timeline-date">{item.dateLabel}</span>
                  <span className={`timeline-pill pill-${item.category.toLowerCase()}`}>
                    {item.category}
                  </span>
                </div>
                <div className="timeline-body">
                  <span className="timeline-icon" aria-hidden="true">
                    {item.category === 'Lab' && (
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <path
                          d="M10 3v5.586L5.293 13.293A1 1 0 0 0 6 15h12a1 1 0 0 0 .707-1.707L14 8.586V3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 15h10v2a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-2Z"
                          fill="currentColor"
                          opacity="0.12"
                        />
                      </svg>
                    )}
                    {item.category === 'Consultation' && (
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <path
                          d="M7 5h10a2 2 0 0 1 2 2v5.5A3.5 3.5 0 0 1 15.5 16H12l-3.5 3v-3H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                    {item.category === 'Billing' && (
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <rect
                          x="3"
                          y="5"
                          width="18"
                          height="14"
                          rx="2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        />
                        <path
                          d="M3 10h18M8 15h2.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </span>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="dashboard-panel">
          <div className="panel-header">
            <h2>Consultation Summary</h2>
            <button type="button" onClick={() => onNavigate('prescriptions')}>View Notes</button>
          </div>
          <ul className="consultation-list">
            {filteredConsultations.map((item) => (
              <li key={item.id}>
                <div className="consultation-header">
                  <strong>{item.doctor}</strong>
                  <span className="consultation-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M7 10a5 5 0 1 1 10 0v1.5a2.5 2.5 0 0 1-1.17 2.12l-1.33.84V18h-5v-3.54l-1.33-.84A2.5 2.5 0 0 1 7 11.5Z"
                        fill="currentColor"
                      />
                      <path
                        d="M10 19.5h4A2.5 2.5 0 0 1 16.5 22h-9A2.5 2.5 0 0 1 10 19.5Z"
                        fill="currentColor"
                        opacity="0.9"
                      />
                    </svg>
                  </span>
                </div>
                <p>{item.summary}</p>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

export default PatientDashboard;
