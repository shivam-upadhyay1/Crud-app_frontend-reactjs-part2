import React from 'react';

const headerStyle = {
	backgroundColor: '#28a745',
	color: '#fff',
	padding: '20px',
	textAlign: 'center',
  };

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '5px',
  margin: '10px',
  padding: '10px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const footerStyle = {
	backgroundColor: '#28a745',
  color: '#fff',
  padding: '10px',
  textAlign: 'center',
};

const students = [
  { id: 1, name: 'Kimmy', age: 20, grade: 'A', image: 'https://play-lh.googleusercontent.com/7Ak4Ye7wNUtheIvSKnVgGL_OIZWjGPZNV6TP_3XLxHC-sDHLSE45aDg41dFNmL5COA' },
  { id: 2, name: 'fernandis', age: 21, grade: 'B', image: 'https://easy-peasy.ai/images/18.jpeg' },
  { id: 3, name: 'Smita', age: 22, grade: 'A', image: 'https://image.cnbcfm.com/api/v1/image/107162559-1670422900074-IMG_1461.jpg' },
];

const StudentHomePage = () => {
  return (
    <div>
      <header style={headerStyle}>
        <h2>Welcome to the Student Management System</h2>
      </header>

      <div className="container">
        <div className="row">
          {students.map((student) => (
            <div className="col-md-4" key={student.id}>
              <div style={cardStyle}>
                <img
                  src={student.image}
                  alt={student.name}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <h3>{student.name}</h3>
                <p>Age: {student.age}</p>
                <p>Grade: {student.grade}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer style={footerStyle}>
        <p>&copy; {new Date().getFullYear()} Student Management System</p>
      </footer>
    </div>
  );
};

export default StudentHomePage;
