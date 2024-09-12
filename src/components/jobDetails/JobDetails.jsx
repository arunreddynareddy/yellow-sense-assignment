import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./JobDetails.css";

const JobDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { job } = location.state || {};
  console.log(job)

  if (!job) {
    return <p>Job details not available.</p>;
  }

  return (
    <div className="job-details-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>
      <div className="more-details-container">
        <h2 className="job-details-title">{job.title}</h2>
        <p><strong>Company Name : </strong> {job.company_name || "N/A"}</p>
        <p><strong>Category : </strong> {job.job_category || "N/A"}</p>
        <p><strong>Job Hours : </strong> {job.job_hours || "N/A"}</p>
        <p><strong>No of Openings : </strong> {job.job_tags[0]?.value || "N/A"}</p>
        <p><strong>Experience : </strong> {job.primary_details?.Experience || "N/A"}</p>
        <p><strong>Qualification : </strong> {job.primary_details?.Qualification || "N/A"}</p>
        <p><strong>Location : </strong> {job.primary_details?.Place || "N/A"}</p>
        <p><strong>Salary : </strong> {job.primary_details?.Salary || "N/A"}</p>
        <p><strong>Phone : </strong> {job.whatsapp_no || "N/A"}</p>
      </div>
    </div>
  );
};

export default JobDetails;
