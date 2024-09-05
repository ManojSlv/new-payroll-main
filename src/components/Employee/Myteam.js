import React, { useContext, useState } from 'react';
import { EmployeeContext } from '../../contexts/EmployeeContext';

const teamPage= {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: '#ffffff',
  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
  border: '2px solid #fbfbfb',
  borderRadius: '10px',
  width: '70%',
  margin: '40px auto',
  padding: '20px',
  boxSizing: 'border-box',
  // backgroundColor: '#2f30312f',
  backgroundColor: 'rgb(7, 10, 92)',
  marginRight: '50%',
  height: '70vh',
};
const teamHeading= {
  textAlign: 'center',
  marginBottom: '20px',
  fontSize: '2em',
  color: '#fff',
};
const mainTeamPage= {
  backgroundColor: '#2f30312f',
};
const treeStructure= {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxHeight: '60vh',
  overflowY: 'auto',
  scrollbarWidth: 'none',
};
const treeNode= {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '10px 0',
};
const subordinateSection= {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '10px',
  flexWrap: 'wrap',
};
const profileBox= {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '1px solid #ddd',
  padding: '10px',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.4s ease',
  margin: '10px',
  flex: '1 1 calc(33.33% - 20px)',
  maxWidth: '140px',
  boxSizing: 'border-box',
};
const profileBoxHover= {
  transform: 'translateY(-10px)',
  cursor: 'pointer',
};
const profilePhoto = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: '10px',
};
const backButton = {
  marginTop: '20px',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#152777',
  color: '#fff',
  cursor: 'pointer',
  display: 'block',
};

const MyTeam = () => {
  const { manager, teamLeads, employees } = useContext(EmployeeContext);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handlePersonClick = (person) => {
    setSelectedPerson(person);
  };

  const handleBackToTeam = () => {
    setSelectedPerson(null);
  };

  const renderPerson = (person) => (
    <div
      style={{ ...profileBox, ...(selectedPerson && profileBoxHover) }}
      onClick={() => handlePersonClick(person)}
    >
      <img src={person.photo} alt={person.name} style={profilePhoto} />
      <h3>{person.name}</h3>
      <p>{person.role}</p>
    </div>
  );

  return (
    <div style={{ ...teamPage, ...(selectedPerson ? { height: 'auto' } : mainTeamPage) }}>
      <h1 style={teamHeading}>My Team</h1>
      {selectedPerson ? (
        <div>
          <img src={selectedPerson.photo} alt={selectedPerson.name} style={profilePhoto} />
          <h2>{selectedPerson.name}</h2>
          <p>Role: {selectedPerson.role}</p>
          <p>Experience: {selectedPerson.experience}</p>
          <p>Skills: {selectedPerson.skills.join(', ')}</p>
          <button onClick={handleBackToTeam} style={backButton}>
            Back to Team
          </button>
        </div>
      ) : (
        <div style={treeStructure}>
          {manager && renderPerson(manager)}
          {teamLeads.map((lead) => (
            <div key={lead.id} style={treeNode}>
              {renderPerson(lead)}
              <div style={subordinateSection}>
                {employees
                  .filter((emp) => emp.role !== 'Manager' && emp.role !== 'Team Lead')
                  .map((employee) => renderPerson(employee))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTeam;
