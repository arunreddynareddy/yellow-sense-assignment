import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Jobs.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://testapi.getlokalapp.com/common/jobs?page=${page}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.results.length > 0) {
          setIsLoading(false);
          setJobs(data.results);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        setIsLoading(false)
        setError(error.message);
      }
    };

    fetchJobs();
  }, [page]);

  const handleBookmark = (job) => {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarkedJobs")) || [];
    const isAlreadyBookmarked = bookmarks.some((bJob) => bJob.id === job.id);
    if (!isAlreadyBookmarked) {
      bookmarks.push(job);
      localStorage.setItem("bookmarkedJobs", JSON.stringify(bookmarks));
      alert("Job bookmarked!");
    } else {
      alert("Job is already bookmarked.");
    }
  };

  const handleViewDetails = (job) => {
    navigate(`/job/${job.id}`, { state: { job } });
  };

  const handleNextPage = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      setHasMore(true);
    }
  };

  return (
    <div className="jobs-container">
      <h2>Job Listings</h2>
      {isLoading && <p style={{textAlign: "center"}}>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!isLoading && jobs.length === 0 && <p style={{textAlign: "center"}}>No jobs available</p>}
      <ul className="jobs-list">
        {jobs.map((job) => (
          <li key={job.id} className="job-card">
            <h3 onClick={() => handleViewDetails(job)} className="job-title">
              {job.title || "Title Not Available"}
            </h3>
            <p>
              <strong>Location:</strong> {job.primary_details?.Place || "N/A"}
            </p>
            <p>
              <strong>Salary:</strong> {job.primary_details?.Salary || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {job.primary_details?.Phone || "N/A"}
            </p>
            <button
              onClick={() => handleBookmark(job)}
              className="bookmark-btn"
            >
              Bookmark
            </button>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="pagination-btn"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={handleNextPage}
          disabled={!hasMore}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Jobs;
