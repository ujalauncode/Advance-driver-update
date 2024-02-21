import React, { useEffect, useState } from "react";
import Header from "./Header";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import SearchIcon from "@mui/icons-material/Search";
import giphy from "../Image/giphy.gif";
import axios from "axios";
import { invoke } from '@tauri-apps/api/tauri';


function Dafrag({ currentDate, setCurrentDate }) {
  const [show, setshow] = useState(false);
  const [driverData, setDriverData] = useState([]);
  const [currentIndexs, setCurrentIndexs] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [cleanerStatus, setCleanerStatus] = useState("status");
  const [isScanning, setIsScanning] = useState(true);
  const [scanInterval, setScanInterval] = useState(null);
  const [initialInterval, setInitialScanInterval] = useState(null);
  const [redirectPath, setRedirectPath] = useState(null);
  const [showBackupMessage, setShowBackupMessage] = useState(false);
  const [driversCount, setDriversCount] = useState(null);
  const[isBackupComplete,setIsBackupComplete]=useState()
  const [totalcount, setTotalCount] = useState(null);

  const Tauri = window.__TAURI__;

  let intervalId;

  useEffect(() => {
    return () => {
      clearInterval(scanInterval);
    };
  }, [scanInterval]);

  const handleScanToggle = () => {
    if (isScanning) {
      // Stop scanning
      setIsScanning(false);
      clearInterval(scanInterval);
      setScanInterval(null); // Clear the stored interval ID
    } else {
      // Start or resume scanning
      setIsScanning(true);

      const interval = setInterval(() => {
        setPercentage((prevPercentage) => Math.min(prevPercentage + 0.5, 100));
        setCurrentIndexs((prevIndex) => Math.min(prevIndex + 1, driverData.length));

        if (currentIndexs === driverData.length) {
          clearInterval(interval);
          setPercentage(100);
          setCleanerStatus(status);
          setRedirectPath("/scan-registry");
        }
      }, 10);

      setScanInterval(interval); // Store the interval ID for later clearing
    }
  };
  
  const getTotalCount = async () => {
    try {
      const response = await axios.get("http://localhost:3000/totalcount");
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Error getting total count:", error);
    }
  };
  
useEffect(()=>{
  getTotalCount()
})

  let initialScanInterval;

 // Empty dependency array ensures the effect runs only once on mount

  const backupdata = async () => {
    try {
      const response = await axios.post("http://localhost:3000/backupall");
      const newDriverData = response.data;
      setDriverData(newDriverData.driversCount);
      setDriversCount(newDriverData.driversCount.length)
      console.log( "new driver data =",newDriverData)
      setCurrentIndexs(0); 
      setIsBackupComplete(false);
      const newDate = new Date().toString();

      initialScanInterval = setInterval(() => {
        if (isScanning && !isBackupComplete) {
          setIsScanning(true);
          setPercentage((prevPercentage) =>
            Math.min(prevPercentage + 100 / newDriverData.driversCount.length, 100)
          );
          setCurrentIndexs((prevIndex) => prevIndex + 1);
          if (currentIndexs >= newDriverData.driversCount.length) {
            clearInterval(initialScanInterval);
            setPercentage(100);
            setIsBackupComplete(true);
          }
        }
      }, 100);

      console.log("Initial interval id =", initialScanInterval);
      return () => clearInterval(initialScanInterval);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (percentage === 100) {
      const timeoutId = setTimeout(() => {
        setShowBackupMessage(true);
      }, 1000); // 10 seconds delay
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [percentage]);

  const handlenext = async () => {
   if(!show){
    backupdata()
    setshow(true)
   }
  };

  return (
    <>
      <div className="container-darfrag testing-class">
        <div className="lastScreenResult">
          <div className="lastScreenResultSecond text-xs ">Last Scan Result :</div>
        </div>
        <h4 className="dafrag-hh">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo
          commodi deleniti praesentium. Mollitia, cupiditate! Suscipit fugiat ex
          quo! Inventore praesentium velit officiis fugiat illum quibusdam cum
          animi culpa aliquam quae?
        </h4>
        <br />
        <div className="divide-y divide-slate-200 ">
          <p className="ml-14 font-black fontofoption mb-2">
            {" "}
            Select the Backup Job :
          </p>
          <div class="form-check ml-16 fontofoption1">
          <input
  class="form-check-input"
  type="radio"
  name="flexRadioDefault"
  id="flexRadioDefault1"
  checked
/>
<label class="form-check" for="flexRadioDefault1">
  Create complete backup of all system drivers
  <br />
  Select this option to create a complete backup of all the system drivers
</label>
          </div>
        </div>
        <div id="pagescanbottom" className="fixed-bottom  ">
          <button className="btn btn-dark designbtnbackup1 px-5" onClick={handlenext}> Next </button>
        </div>
      </div>
      {show && (
        <div className="exclusion-main1">
          <div className="container-darfrag testing-class">
            <div className="lastScreenResult">
              <div className="lastScreenResultSecond text-sm">Creating Backup of All Drivers</div>
            </div>
            <div className="StartScan flex justify-content-between">
              <div>
                <img src={giphy} alt="" className="imageofscan mr-3" />
              </div>
              <div>
                <div className="progress">
                  <div
                    className="progress-bar bg-dark"
                    role="progressbar"
                    style={{ width: `${percentage}%` }}
                    aria-valuenow={percentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <span>{percentage.toFixed()}%</span>
                  </div>
                </div>
                <span className="ml-16 text-xs mt-16">
                  {currentIndexs < driverData.length && (
                    <p className="dat">                    
                      {driverData[currentIndexs].DeviceName}
                    </p>
                  )}
                </span>
              </div>
             
            </div>
     
          </div>
          {showBackupMessage && (
            <div>
        <div className="designthisone">
          <span className="text-sm font-bold text-green-600 flex justify-content-center border-b-2 my-2	">Backup Completed Successfully</span>
          <div className="flex justify-content-between mt-1 mx-10 a">
          <p>Total Drivers: </p>
          <span>{driversCount} drivers</span>

          </div>
          <div className="flex justify-content-between mx-10 a">
          <p> Drivers Selected For Backup: </p>
          <span>{totalcount} drivers</span>

          </div>
          <div className="flex justify-content-between mx-10 a">
          <p>Backup Completed For Drivers: </p>
          <span>Successful</span>

          </div>
        </div>
        <div >
          <p className="text-green-500 border-t-2 mb-1 mt-14 mx-4 text-xs font-bold 	">Recommended Action:</p>
        <p className="text-xs  mt-1 mx-4 leading-4">System with outdated drivers may not work with full efficiency.It is recommended to resister Advance Driver Update to update system specific drivers</p>
        </div>
</div>
      )}
          <div
            id="pagescanbottom21"
            className="fixed-bottom  mb-3 flex justify-content-end bg-gray-100"
          >
            <button className="btn btn-light designbtn1 border-black	text-black " onClick={(e) => setshow(false)}>
              Finish
            </button>
            <button className="btn btn-light designbtn1 mr-2 border-black	 text-black "  onClick={handleScanToggle}>
            {isScanning ? "Stop Backup" : "Start Backup"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Dafrag;



