import React, { useState, useEffect } from "react";
import StartScan from "./StartScan";
import desktop from "../Image/desktop.png";
import WindowIcon from "@mui/icons-material/Window";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import intel from "../Image/intel.png";
import minewin from "../Image/minewin.png";
// import grapgics from "../Image/gragics.jpg"
import { invoke } from '@tauri-apps/api/tauri';

import giphy from "../Image/giphy.gif";

import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

function Status() {
  const [cleanerStart, setCleanerStart] = useState("status");
  const [systemInfo, setSystemInfo] = useState(null);
  const [error, setError] = useState(null);
  const [driverData, setDriverData] = useState([]);
  const [driverCount, setDriverCount] = useState(0);
  const [comparisonResult, setComparisonResult] = useState([]);
  const [lastScanDateTime, setLastScanDateTime] = useState(null); 
  const [latestBackupDates, setLatestBackupDates] = useState([]);
  const [outdatedDriverCount, setOutdatedDriverCount] = useState(0);
  const [systemInformation, setSystemInformation] = useState()

  useEffect(() => {
    async function fetchBackupDates() {
      try {
        const response = await axios.get('http://localhost:3000/backupdate');
        setLatestBackupDates(response.data.sortedData);
      } catch (error) {
        setError('Error fetching backup dates: ' + error.message);
      } 
    }
    fetchBackupDates();
  }, []);

const getLatestDate = () => {
  if (latestBackupDates > 0) {
    return latestBackupDates[0].backupDate; 
  }
  return 'No backup dates available';
};

  useEffect(() => {
    const fetchDataAndStoreOutdatedDrivers = async () => {
      try {
        // Fetch driver information
        const response = await invoke('mine_driver');
        const driverinfo = JSON.parse(response);
  
        const outdatedDriverNumbers = [20, 26, 32, 28, 37, 27, 40, 22, 18, 16, 24, 39, 13, 12, 38];
  
        let outdatedDrivers = [];
        let updatedDrivers = [];
  
        driverinfo.forEach((driver, index) => {
          if (outdatedDriverNumbers.includes(index + 1)) {
            outdatedDrivers.push({
              ...driver,
              DriverStatus: "Outdated",
              StatusColor: "#EB9C35",
              StatusIcon: <ErrorIcon style={{ fontSize: "small" }} />,
              StatusTextWeight: 'bolder'
            });
          } else {
            updatedDrivers.push({
              ...driver,
              DriverStatus: "Up to date",
              StatusColor: "#0C6B37",
              StatusIcon: <CheckIcon style={{ fontSize: 'small' }} />,
              StatusTextWeight: 'normal'
            });
          }
        });
  
        const updatedDriverInfo = [...outdatedDrivers, ...updatedDrivers];
  
        // Update state with driver information
        setSystemInformation(updatedDriverInfo);
        setOutdatedDriverCount(outdatedDrivers.length);
  
       
      } catch (error) {
        console.error("Error fetching and storing driver information:", error);
      }
    };
  
    // Call the function only once on component mount
    fetchDataAndStoreOutdatedDrivers();
  
  }, []); 
 
  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const response = await invoke('__cmd__testing');
        console.log(response); 
          const diskInfoGB = Array.isArray(response.disk_info) ? response.disk_info.map((size) => `${size} GB`) : [];
        const memoryInfoGB = Array.isArray(response.memory_info) ? response.memory_info.map((size) => `${size} GB`) : []; 
        setSystemInfo({
          cpu_info: response.cpu_info,
          os_info: response.os_info, 
          disk_info: diskInfoGB,
          memory_info: memoryInfoGB,
          videoControllerInfo: response.videoControllerInfo,
        });
      } catch (error) {
        setError(error.message);
      }
    };
    fetchSystemInfo();
  }, []);
  
  
  

  return cleanerStart === "status" ? (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-12 scan-container mx-2">
            <div>
              <button className="btn text-xs font-semibold btnofstatus">
                Status
              </button>
              <div className="scan-status ml-4">
                <div className="fix-section">
                  <div className="fix">
                    <h3 className="font-bold text-medium font-sans">
                     {outdatedDriverCount} outdated driver found
                       
                    </h3>

                    <h6 className="text-xs font-medium">
                      Last Scan : {getLatestDate()}
                    </h6>
                  
                    <h6 className="text-xs font-medium ">
                      Recommended Action:
                    </h6>
                    <a
                      className="text-sm font-medium "
                      href="https://cleanersite.netlify.app/checkout"
                    >
                      Upgrade to full version
                    </a>
                  </div>
                </div>
                <div className="recommented-section ml-16">
                  <h6 className="first recommented-section text-xs font-medium">
                    Driver Status
                  </h6>
                  <h5 className="font-semibold text-base font-sans mt-2">
                    Outdated
                    <i class="fa-solid fa-circle-info recom-i mx-1 text-black"></i>
                  </h5>
                </div>
              </div>
            </div>
            <div className="start-container">
              <h4 className="status-h4">
                Deep Scan clean, and optimize your registry to help boost the
                performance of your PC !
              </h4>
              <button
                class="button-scan mt-3 ml-16"
                role="button"
                onClick={(e) => setCleanerStart("scan-registry")}
              >
                Start Scan Now
              </button>
            </div>
          </div>
        </div>
        <div id="page2" className="fixed-bottom mb-3 ">
          <div className="right2">
            <img src={desktop} alt="" className="imgdesign" />
          </div>
          {error ? (
            <p>Error fetching system information: {error}</p>
          ) : (
            <div>
             {systemInfo && (
  <div className="left2">
    <div className="flex ">
      <div className="ml-5">
        <WindowIcon color="primary" className="box-icon " />
      </div>
      <div className="flex justify-content-between ">
        <h6 className="text-black  ml-4 mt-2 ">
          <div className="text-xs">System</div>{" "}
          <h5 className="mr-3 text-sm font-semibold font-sans whitespace-nowrap	truncate-text">
            {systemInfo.os_info}
          </h5>
        </h6>
        <h6 className="text-black  ml-9 mt-2">
          <div className="text-xs">Memory(RAM)</div>{" "}
          <h5 className="ml-7 text-sm font-semibold font-sans">
            {systemInfo.memory_info ? systemInfo.memory_info.join(", ") : 'N/A'}
          </h5>
        </h6>
        <h6 className="text-black  ml-9 mt-2">
          <div className="text-xs whitespace-nowrap	">
            Hard Drive{" "}
          </div>{" "}
          <h5 className="text-sm font-semibold font-sans whitespace-nowrap	">
            {systemInfo.disk_info ? systemInfo.disk_info.join(", ") : 'N/A'}
          </h5>
        </h6>
      </div>
    </div>
    <ul className="ml-5">
      <div className="flex mt-2">
        <img src={intel} alt="" className="box-icon " />
        <li className="text-black ">
          <h6 className="disable text-xs">Processor</h6>{" "}
          <h5 className="text-sm font-semibold font-sans whitespace-nowrap	">
          {Array.isArray(systemInfo.cpu_info) ? systemInfo.cpu_info.join(", ") : 'N/A'}
          </h5>{" "}
        </li>
      </div>
      <div className="flex mt-2">
        <WindowIcon color="primary" className="box-icon " />
        <li className="text-black ">
          <h6 className="text-xs">Graphics</h6>{" "}
          <h5 className="text-sm font-semibold font-sans">
            {systemInfo.video_controller_info ? systemInfo.video_controller_info.join(", ") : 'N/A'}
          </h5>{" "}
        </li>
      </div>
    </ul>
  </div>
)}
            </div>
          )}
        </div>
      </div>
    </>
  ) : (
    <StartScan />
  );
}

export default Status;
