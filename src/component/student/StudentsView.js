import React, { useEffect, useState } from "react";
import axios from "axios";  //mainly used to get the url through postmen
import {
  FaEdit,
  FaEye,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "../common/Search";
import  "./StudentsView.css";

const StudentsView = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadStudents(currentPage);
  }, [currentPage]);

  const loadStudents = async (page) => {   //Step-2    load all data from the postmen
	try {
	  const result = await axios.get(
		`http://localhost:4500/students/pagination?page=${page}&size=10`,
		{
		  validateStatus: () => {
			return true;
		  },
		}
	  );
	  if (result.status === 200) {
		setStudents(result.data.content);
		setTotalPages(result.data.totalPages);
	  } else {
		console.error("API request failed with status:", result.status);
	  }
	} catch (error) {
	  console.error("Error loading students:", error);
	}
  };
  

  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:4500/students/delete/${id}`
    );
    loadStudents(currentPage);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    //Step 1
    <section>        
      <Search search={search} setSearch={setSearch} />
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Depatment</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {students
            .filter((st) =>
              st.firstName.toLowerCase().includes(search)
            )
            .map((student, index) => (
              <tr key={student.id}>
                <th scope="row">{currentPage * 10 + index + 1}</th>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.department}</td>
                <td className="mx-2">
                  <Link
                    to={`/student-profile/${student.id}`}
                    className="btn btn-info"
                  >
                    <FaEye />
                  </Link>
                </td>
                <td className="mx-2">
                  <Link
                    to={`/edit-student/${student.id}`}
                    className="btn btn-warning"
                  >
                    <FaEdit />
                  </Link>
                </td>
                <td className="mx-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(student.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`pagination-button ${
              index === currentPage ? "active" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default StudentsView;
