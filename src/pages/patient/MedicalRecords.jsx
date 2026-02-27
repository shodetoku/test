import { getCurrentUser } from '../../services/AuthService';
import { mockMedicalRecords } from '../../utils/SampleData';
import BackToDashboardBar from '../../components/patient/navigation/BackToDashboardBar';
import '../../assets/styles/MedicalRecords.css';

function downloadRecordPdf(label) {
  const blob = new Blob([`Mock PDF export for ${label}`], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${label.replace(/\s+/g, '-').toLowerCase()}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}

function MedicalRecords({ onNavigate }) {
  const user = getCurrentUser();
  const laboratory = mockMedicalRecords.clinicalSummaries || [];
  const imaging = (mockMedicalRecords.clinicalSummaries || []).slice(0, 2).map((item, index) => ({
    id: `img-${index + 1}`,
    title: index === 0 ? 'Chest X-Ray' : 'Abdominal Ultrasound',
    date: item.date,
    summary: item.notes
  }));
  const vaccines = mockMedicalRecords.immunizations || [];

  if (!user) {
    return (
      <div className="medical-records">
        <div className="records-container">
          <div className="not-logged-in">
            <h2>Please log in to view your medical records</h2>
            <button className="btn-login-redirect" onClick={() => onNavigate('login')}>
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="medical-records">
      <div className="records-container">
        <BackToDashboardBar onNavigate={onNavigate} />
        <div className="records-header">
          <h1>Medical Timeline</h1>
          <p>Grouped records with quick document export.</p>
        </div>

        <section className="record-group">
          <div className="content-header">
            <h2>Laboratory</h2>
          </div>
          {laboratory.length > 0 ? (
            <div className="summaries-list">
              {laboratory.map((record) => (
                <article key={record.id} className="summary-card">
                  <div className="summary-header">
                    <span className="summary-doctor">{record.doctor}</span>
                    <span>{new Date(record.date).toLocaleDateString()}</span>
                  </div>
                  <div className="summary-body">
                    <div className="summary-row">
                      <span className="summary-label">Diagnosis:</span>
                      <span className="summary-value">{record.diagnosis}</span>
                    </div>
                    <div className="summary-notes">
                      <span className="summary-label">Consultation Summary:</span>
                      <p>{record.notes}</p>
                    </div>
                    <button type="button" className="btn-download" onClick={() => downloadRecordPdf(`laboratory-${record.id}`)}>
                      Download PDF
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-data">
              <div className="no-data-icon">🧪</div>
              <p>No records found. Upload new laboratory records.</p>
              <button type="button" className="btn-upload" onClick={() => onNavigate('my-account')}>Upload Now</button>
            </div>
          )}
        </section>

        <section className="record-group">
          <div className="content-header">
            <h2>Imaging</h2>
          </div>
          {imaging.length > 0 ? (
            <div className="summaries-list">
              {imaging.map((record) => (
                <article key={record.id} className="summary-card">
                  <div className="summary-header">
                    <span className="summary-doctor">{record.title}</span>
                    <span>{new Date(record.date).toLocaleDateString()}</span>
                  </div>
                  <div className="summary-body">
                    <div className="summary-notes">
                      <span className="summary-label">Consultation Summary:</span>
                      <p>{record.summary}</p>
                    </div>
                    <button type="button" className="btn-download" onClick={() => downloadRecordPdf(`imaging-${record.id}`)}>
                      Download PDF
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-data">
              <div className="no-data-icon">🩻</div>
              <p>No records found. Upload new imaging files.</p>
              <button type="button" className="btn-upload" onClick={() => onNavigate('my-account')}>Upload Now</button>
            </div>
          )}
        </section>

        <section className="record-group">
          <div className="content-header">
            <h2>Vaccines</h2>
          </div>
          {vaccines.length > 0 ? (
            <div className="immunizations-list">
              {vaccines.map((record) => (
                <article key={record.id} className="immunization-card">
                  <div className="immunization-info">
                    <h3>{record.vaccine}</h3>
                    <div className="immunization-dates">
                      <div className="date-info">
                        <span className="date-label">Administered:</span>
                        <span className="date-value">{new Date(record.date).toLocaleDateString()}</span>
                      </div>
                      <div className="date-info">
                        <span className="date-label">Next Due:</span>
                        <span className="date-value">{new Date(record.nextDue).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button type="button" className="btn-download" onClick={() => downloadRecordPdf(`vaccine-${record.id}`)}>
                      Download PDF
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-data">
              <div className="no-data-icon">💉</div>
              <p>No records found. Upload vaccine documents.</p>
              <button type="button" className="btn-upload" onClick={() => onNavigate('my-account')}>Upload Now</button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default MedicalRecords;
