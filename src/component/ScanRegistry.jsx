import searchImage from "../Image/search.png";
import searchImage2 from "../Image/search img.png";
import Setting from "./Setting";
import { useEffect, useState } from "react";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import Danger from "../Image/png-transparent-danger-sign-danger-mark-yellow-removebg-preview.png";
import Clock from "../Image/icons8-clock-50.png";
import Calendar from "../Image/icons8-calendar-50.png";
import Computer from "../Image/icons8-desktop-50.png";
import Logo from "../Image/money-back-in-60-days-guarantee-badge-golden-medal-vector-20372626-removebg-preview.png";
import axios from "axios";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import giphy from "../Image/giphy.gif";

import { NavLink, useNavigate } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
export default function ScanRegistry() {
  const [cleanerStart, setCleanerStart] = useState("status");
  const [exclusionStatus, setExclusionStatus] = useState(false);
  const [hide, setHide] = useState(false);
const[show, setShow]=useState(false)
  const [driverData, setDriverData] = useState([]);
  const [driverCount, setDriverCount] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);
  const currentDate = new Date().toLocaleDateString();
  const [systemInformation, setSystemInformation] = useState({
    "WAN Miniport (Network Monitor)": "10.0.22621.3",
    "WAN Miniport (IPv6)": "10.0.22621.3",
    "WAN Miniport (IP)": "10.0.22621.1",
    "WAN Miniport (PPPOE)": "10.0.22621.1",
    "WAN Miniport (PPTP)": "10.0.22621.1",
    "WAN Miniport (L2TP)": "10.0.22621.1",
    "WAN Miniport (IKEv2)": "10.0.22621.1",
    "WAN Miniport (SSTP)": "10.0.22621.1",
    "Generic software device": "10.0.22621.1",
    "Local Print Queue": "10.0.22621.1",
    "Local Print Queue": "10.0.22621.1",
    "Local Print Queue": "10.0.22621.1",
    "Generic software device": "10.0.22621.1",
    "Generic software device": "10.0.22621.1",
    "Generic software device": "10.0.22621.1",
    "Generic software device": "10.0.22621.1",
    "Generic software device": "10.0.22621.1",
    "Computer Device": "10.0.22621.1",
    "Remote Desktop Device Redirector Bus": "10.0.22621.2506",
    "Plug and Play Software Device Enumerator": "10.0.22621.1",
    "Microsoft System Management BIOS Driver": "10.0.22621.1",
    "NDIS Virtual Network Adapter Enumerator": "10.0.22621.1",
    "Microsoft Hyper-V Virtual Disk Server": "10.0.22621.2506",
    "Microsoft Basic Render Driver": "10.0.22621.2506",
    "Microsoft Hyper-V PCI Server": "10.0.22621.1",
    "Acer Inc. System Firmware 1.26": "5.42.1.26",
    "Microsoft UEFI-Compliant System": "10.0.22621.1",
    "ACPI Thermal Zone": "10.0.22621.1",
    "ACPI Fan": "10.0.22621.1",
    "ACPI Fan": "10.0.22621.1",
    "ACPI Fan": "10.0.22621.1",
    "ACPI Fan": "10.0.22621.1",
    "ACPI Fan": "10.0.22621.1",
    "Motherboard resources": "10.0.22621.1",
    "Trusted Platform Module 2.0": "10.0.22621.2506",
    "HID-compliant wireless radio controls": "10.0.22621.2506",
    "Acer Airplane Mode Controller": "1.0.0.10",
    "HID-compliant system controller": "10.0.22621.2506",
    "HID-compliant consumer control device": "10.0.22621.1",
    "HID Keyboard Device": "10.0.22621.1",
    "Converted Portable Device Control device": "10.0.22621.1",
    "Portable Device Control device": "10.0.22621.1",
    "Intel(R) HID Event Filter": "2.2.1.384",
    "ACPI Power Button": "10.0.22621.1",
    "Intel(R) Power Engine Plug-in": "10.0.22621.2792",
    "Microsoft Windows Management Interface for ACPI": "10.0.22621.1",
    "Microsoft Windows Management Interface for ACPI": "10.0.22621.1",
    "ACPI Processor Aggregator": "10.0.22621.1",
    "Intel Processor": "10.0.22621.2506",
    "Intel Processor": "10.0.22621.2506",
    "Intel Processor": "10.0.22621.2506",
    "Intel Processor": "10.0.22621.2506",
    "ACPI Sleep Button": "10.0.22621.1",
    "Motherboard resources": "10.0.22621.1",
    "Intel(R) Serial IO GPIO Host Controller - INT34C5": "30.100.2031.2",
    "Motherboard resources": "10.0.22621.1",
    "Motherboard resources": "10.0.22621.1",
    "Microsoft Windows Management Interface for ACPI": "10.0.22621.1",
    "Motherboard resources": "10.0.22621.1",
    "Intel(R) SPI (flash) Controller - A0A4": "10.1.24.5",
    "Intel(R) SMBus - A0A3": "10.1.24.5",
    "Audio Endpoint": "10.0.22621.1",
    "Realtek Audio Effects Component": "13.247.1124.210",
    "Intel® Smart Sound Technology for Digital Microphones": "10.29.0.9677",
    "Intel® Smart Sound Technology for Bluetooth® Audio": "10.29.0.9677",
    "Intel® Smart Sound Technology for USB Audio": "10.29.0.9677",
    "Audio Endpoint": "10.0.22621.1",
    "Realtek Audio Universal Service": "1.0.668.0",
    "Realtek Hardware Support Application": "11.0.6000.313",
    "Realtek Audio Effects Component": "13.0.6000.1097",
    "Realtek Audio": "6.0.9601.1",
    "Intel® Smart Sound Technology Detection Verification": "1.0.3045.0",
    "Intel® Smart Sound Technology OED": "10.29.0.9677",
    "Intel® Smart Sound Technology BUS": "10.29.0.9677",
    "ACPI Lid": "10.0.22621.1",
    "Microsoft AC Adapter": "10.0.22621.1",
    "Microsoft ACPI-Compliant Control Method Battery": "1.0.0.6",
    "Microsoft ACPI-Compliant Embedded Controller": "10.0.22621.1",
    "Standard PS/2 Keyboard": "10.0.22621.1",
    "Motherboard resources": "10.0.22621.1",
    "System timer": "10.0.22621.1",
    "System CMOS/real time clock": "10.0.22621.1",
    "Motherboard resources": "10.0.22621.1",
    "Programmable interrupt controller": "10.0.22621.1",
    "High precision event timer": "10.0.22621.1",
    "Intel(R) LPC Controller/eSPI Controller (U Premium...": "10.1.24.5",
    "Realtek PCIe GbE Family Controller": "10.63.1014.2022",
    "Intel(R) PCI Express Root Port #9 - A0B0": "10.1.24.5",
    "Intel(R) Serial IO I2C Host Controller - A0C6": "30.100.2031.2",
    "Intel(R) Serial IO I2C Host Controller - A0C5": "30.100.2031.2",
    "Intel RST VMD Managed Controller 09AB": "18.6.1.1016",
    "Intel(R) Management and Security Application Local...": "2130.1.16.1",
    "Intel(R) iCLS Client": "1.63.1155.1",
    "Intel(R) Dynamic Application Loader Host Interface": "1.41.2021.121",
    "Intel(R) Management Engine Interface #1": "2040.100.0.1029",
    "Microsoft Input Configuration Device": "10.0.22621.1",
    "HID-compliant touch pad": "10.0.22621.2506",
    "HID-compliant vendor-defined device": "10.0.22621.2506",
    "HID-compliant mouse": "10.0.22621.1",
    "I2C HID Device": "10.0.22621.2506",
    "Intel(R) Serial IO I2C Host Controller - A0EB": "30.100.2031.2",
    "Intel(R) Serial IO I2C Host Controller - A0E8": "30.100.2031.2",
    "Microsoft Wi-Fi Direct Virtual Adapter": "10.0.22621.1",
    "Microsoft Wi-Fi Direct Virtual Adapter": "10.0.22621.1",
    "Intel(R) Wireless-AC 9560 160MHz": "22.10.0.7",
    "PCI standard RAM Controller": "10.0.22621.1",
    "Microsoft Bluetooth LE Enumerator": "10.0.22621.2506",
    "Bluetooth Device (Personal Area Network)": "10.0.22621.2506",
    "Bluetooth Device": "10.0.22621.3007",
    "Bluetooth Device": "10.0.22621.3007",
    "Microsoft Bluetooth Hands-Free Profile AudioGatewa...": "10.0.22621.1",
    "Microsoft Bluetooth Hands-Free Profile AudioGatewa...": "10.0.22621.1",
    "Microsoft Bluetooth Avrcp Transport Driver": "10.0.22621.2506",
    "Microsoft Bluetooth Avrcp Transport Driver": "10.0.22621.2506",
    "Microsoft Bluetooth A2dp Source": "10.0.22621.1",
    "Microsoft Bluetooth A2dp Source": "10.0.22621.1",
    "Microsoft Bluetooth Enumerator": "10.0.22621.3007",
    "Bluetooth Device (RFCOMM Protocol TDI)": "10.0.22621.2506",
    "Intel(R) Wireless Bluetooth(R)": "22.230.0.2",
    "WinUsb Device": "10.0.22621.2506",
    "USB Video Device": "10.0.22621.2506",
    "USB Composite Device": "10.0.22621.2506",
    "USB Root Hub (USB 3.0)": "10.0.22621.2861",
    "USB xHCI Compliant Host Controller": "10.0.22621.2506",
    "Intel(R) Optane(TM) Memory and Storage Management ...": "18.6.1.1016",
    "Generic software component": "10.0.22621.1",
    "Disk drive": "10.0.22621.2506",
    "Intel RST VMD Controller 9A0B": "18.6.1.1016",
    "Intel(R) GNA Scoring Accelerator module": "2.0.0.1097",
    "Generic PnP Monitor": "10.0.22621.2506",
    "Intel(R) Graphics Command Center": "30.0.101.1404",
    "Intel(R) Graphics Control Panel": "30.0.101.1404",
    "Intel(R) UHD Graphics": "30.0.101.1404",
    "PCI standard host CPU bridge": "10.0.22621.1",
    "PCI Express Root Complex": "10.0.22621.2861",
    "Microsoft ACPI-Compliant System": "10.0.22621.2792",
    "ACPI x64-based PC": "10.0.22621.1",
    "Charge Arbitration Driver": "10.0.22621.1",
    "UMBus Root Bus Enumerator": "10.0.22621.2506",
    "Microsoft Storage Spaces Controller": "10.0.22621.2792",
    "Microsoft Virtual Drive Enumerator": "10.0.22621.1",
    "Composite Bus Enumerator": "10.0.22621.1",
    "Microsoft Hyper-V Virtualization Infrastructure Dr...": "10.0.22621.2715",
    "Microsoft Hypervisor Service": "10.0.22621.2506",
    "Microsoft Basic Display Driver": "10.0.22621.1",
    "Microsoft Hyper-V Virtual Machine Bus Provider": "10.0.22621.2506",
    "Volume": "10.0.22621.1",
    "Generic volume shadow copy": "10.0.22621.1",
    "Volume Manager": "10.0.22621.2506",
  });
  const [comparisonResult, setComparisonResult] = useState([]);

  const [updateStatus, setUpdateStatus] = useState('');
const [showdriver,setShowdriver]=useState()

const [isScanning, setIsScanning] = useState(false);
const [percentage, setPercentage] = useState(0);
const [updateCompleted, setUpdateCompleted] = useState(false);

useEffect(() => {
  console.log("hey im here..................")
  if (isScanning) {
      const intervalId = setInterval(() => {
          setPercentage((prevPercentage) => {
              const nextPercentage = Math.min(prevPercentage + 1, 100);
              if (nextPercentage === 100) {
                  clearInterval(intervalId);
                  setUpdateCompleted(true);
              }
              return nextPercentage;
          });
      }, 100);
      return () => {
          clearInterval(intervalId);
      };
  }
}, [isScanning]);

const handleUpdate = async () => {
  try {
      // setIsScanning(true); 
      await axios.post('http://localhost:3000/api/install-windows-update');
      setIsScanning(false); 
  } catch (error) {
      console.error('Error during upload:', error);
      setIsScanning(false); // Reset scanning state to false in case of error
  }
};

const handleupdateofdriver =(e)=>{
  if(!hide){
    setHide(true)
   }
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios("http://localhost:3000/getdrivers");
        const driverinfo = await response.data;
        setSystemInformation(driverinfo);
        console.log(driverinfo);
        const updatedComparisonResult = [];
        console.log("Array updatedComparisonResult", updatedComparisonResult);
        Object.keys(systemInformation).forEach((deviceName) => {
          const backendDriverVersion = systemInformation[deviceName];
          const frontendDriver = driverinfo.find(
            (driver) => driver.DeviceName === deviceName
          );

          if (frontendDriver) {
            const isUpToDate =
              frontendDriver.DriverVersion >= backendDriverVersion ;

            updatedComparisonResult.push({
              deviceName,
              DriverVersion: frontendDriver.DriverVersion,
              DriverStatus: isUpToDate ? "Up to date" : "Outdated",
              StatusColor: isUpToDate ? "#0C6B37" : "#EB9C35",
              StatusIcon: isUpToDate ? <CheckIcon style={{fontSize: 'small',  color: '0C6B37'}} /> : <ErrorIcon style={{fontSize: 'small'}}  />,
              StatusTextWeight: isUpToDate ? 'normal' : 'bolder',
            });
          }
        });
        setComparisonResult(updatedComparisonResult);
      } catch (error) {
        console.error("Error fetching driver information:", error);
      }
    };
    fetchData();
  }, []);

  const handleSelect = (e) => {
    const { name, checked } = e.target;
    let tempDrivers;
  
    if (name === "allselect") {
      tempDrivers = comparisonResult.map((driver) => {
        return { ...driver, ischecked: checked };
      });
    } else {
      tempDrivers = comparisonResult.map((driver) =>
        driver.name === name ? { ...driver, ischecked: checked } : driver
      );
    }
  
    setComparisonResult(tempDrivers);
    const selectedOutdatedCount = tempDrivers.filter((driver) => driver.ischecked && driver.DriverStatus === "Outdated").length;
    setSelectedCount(selectedOutdatedCount);
  };
  const updatedrive = () => {
    if (!showdriver) {
      setShowdriver(true);
      setIsScanning(true);
      setTimeout(()=>{
        handleUpdate();
      },10000)
      setHide(false);
    }
  };


  return cleanerStart === "status" ? (
    <>
      <div className="container-fluid">
        <div className="row flex justify-content-center">
          <div className="col-12 col-lg-12 col-md-12 col-sm-12">
            <div className=" scantopoftable ">
              <div className="designspan font-black text-small">             
              <WatchLaterIcon /> {comparisonResult.filter(driver => driver.DriverStatus === "Outdated").length} Out-Of-Date Drivers Found             
              </div>
              <button
                className="btn btn-light designbtn"
                onClick={(e) => setExclusionStatus(true)}
              >
                Update All
              </button>
            </div>
            {selectedCount > 0 && (
              <p className="text-xs mx-4 mt-1 font-bold">
                {selectedCount} Outdated driver(s) selected!
              </p>
            )}
            <div className="tbwidth tableclasses1  ">
              <table class="table table-hover ">
                <thead className="table-secondary fixed  newto">
                  <tr className="mynewheaddesign flex">
                    <th scope="col">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="allselect"
                          id="allselect"
                          name="allselect"
                          onChange={handleSelect}
                        />
                        <label
                          className="form-check-label font-bold"
                          htmlFor="allselect"
                        >
                          Driver Detail
                        </label>
                      </div>
                    </th>
                    <th scope="col" colspan="1" className="dobold">
                      Status
                    </th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonResult.length > 0 &&
                    comparisonResult.map((driver, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id={`flexCheckDefault-${i}`}
                                name={driver.DeviceName}
                                checked={driver.ischecked}
                                onChange={handleSelect}
                                style={{ display: driver.DriverStatus === "Up to date" ? "none" : "block" }}
                              />
                              <label
                                class="form-check-label"
                                for={`flexCheckDefault-${i}`}
                              >
                                {driver.deviceName}
                              </label>
                            </div>
                          </th>
                          <td colspan="2">
                            <br />
                            <span className="text-xs font-extrabold  " style={{ color: driver.StatusColor ,fontWeight: driver.StatusTextWeight}}>
                              {driver.DriverStatus} {driver.StatusIcon}
                            </span>
                            <br />
                            <span className="text-xs">
                              {" "}
                              Version:{driver.DriverVersion}
                            </span>
                          </td>
                          <td>
                            {driver.DriverStatus === "Outdated" ? (
                              <span
                                className="font-bold text-xs text-blue-500 underline setdriverinfor ml-20" 
                                onClick={handleupdateofdriver}
                              >
                                Update Driver
                              </span>
                            ) : (
                              <span className="font-bold text-xs text-green-500">
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div id="pagescanbottom" className="fixed-bottom ">
          <button className="btn btn-light designbtn1 "   onClick={(e) => setShow(true)}>Learn More</button>
          <span className="mt-6 font-serif text-xs font-medium">
            To Update all rest Drivers click on Update All
          </span>
          <button
            className="btn btn-light designbtn2"
            onClick={(e) => setExclusionStatus(true)}
          >
            Update All
          </button>
        </div>
      </div>
      {hide && (
        <div className="exclusion-main">
          <h1 style={{ marginLeft: "54px", marginTop: "12px" }} className="font-extrabold">
            <b>Intel(R) UHD GRAPHICS </b>
          </h1>
          <div onClick={(e) => setHide(false)}>
            <span className="close"></span>
          </div>
          <div className="flex justify-content-evenly">
            <div className="designupdate">
    <div className="design">
    <span className="font-bold">Driver Status</span><br/>
    <button className="btn btn-primary mt-2 text-xs rounded-md	">OUTEDATED <WatchLaterIcon sx={{ fontSize: 15 }} /></button><br/>
    </div>
           
<div className="mtgiven ">
<span className="font-bold ml-2">Availble</span>
  <span className="flex justify-content-between text-xs mx-2 mt-4">Version: <p>7467.54.5.5.5</p></span><br/>
  <span className="flex justify-content-between text-xs mx-2">Date: <p>26-02-2-24</p></span>
</div>
            </div>
            <div className="designupdate1">
              <h1 className="font-semibold">Register now to enjoy:</h1>
              <div className="mt-4 mb-9">
              <span className="font-thin text-sm mt-3 my-2"><CheckCircleIcon color="primary" sx={{ fontSize: 15 }} /> Update drivers in one click</span><br/>
              <span className="font-thin text-sm"><CheckCircleIcon color="primary" sx={{ fontSize: 15 }} /> Accelerated download</span><br/>
              <span className="font-thin mb-4 text-sm"><CheckCircleIcon color="primary" sx={{ fontSize: 15 }} /> Largest driver database</span>
              
              </div>
              
              <p className="text-xs font-bold">Save time and manual effort</p>

<div className="desbtn">
<button className="btn btn-light bg-green-700 mx-2 px-3 " onClick={updatedrive} >Update</button>
<button className="btn btn-light bg-gray-400  px-3 " > Register Now</button>

</div>


            </div>
          </div>
         
        </div>
      )}
      {exclusionStatus && (
        <div className="exclusion-main">
          <h1
            style={{ marginLeft: "54px", marginTop: "12px" }}
            className="font-extrabold"
          >
            <b>Update all your drivers in minutes</b>
          </h1>
          <div onClick={(e) => setExclusionStatus(false)}>
            <span className="close"></span>
          </div>
          <div className="New-box">
            <div className="row ">
              <div className="flex justify-content-between">
                <img src={Danger} alt="File Explorer" className="boxicons" />
                <div className="popdata">
                  <h4 className="font-extrabold">
                  {comparisonResult.filter(driver => driver.DriverStatus === "Outdated").length} Outdated Drivers Found !
                  </h4>
                  <p className="font-medium text-xs mt-1">
                    To update outdated drivers clickon Purchase Now button.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <h5
            style={{ marginLeft: "34px", marginTop: "22px" }}
            className="text-sm"
          >
            Advanced Driver Updater can quickly and easily update these drivers
            to restore optimum
            <br></br>performance to your PC
          </h5>
          <div className="row flex justify-content-between mt-3 mb-4">
            <div className="col-3 ml-8">
              <div>
                <img
                  src={Clock}
                  alt="File Explorer"
                  className="box-icon ml-6"
                />
              </div>
              <div className="text-xs font-semibold">
                <h6>
                  Easy to use , Safe <br /> and saves your time .{" "}
                </h6>{" "}
              </div>
            </div>

            <div className="col-3">
              <div>
                {" "}
                <img
                  src={Computer}
                  alt="File Explorer"
                  className="box-icon ml-6"
                />
              </div>
              <div className="text-xs font-semibold">
                <h6>
                  Get the most out <br /> of your PC
                </h6>{" "}
              </div>{" "}
            </div>
            <div className="col-3">
              <div>
                {" "}
                <img
                  src={Calendar}
                  alt="File Explorer"
                  className="box-icon ml-6"
                />
              </div>
              <div className="text-xs font-semibold">
                <h6>
                  Ensure Long lasting <br />
                  performance
                </h6>{" "}
              </div>{" "}
            </div>
          </div>
          <div className="footer bottom-0">
            <div className="row">
              <div className="flex justify-content-between ">
                <div className="flex">
                  <img src={Logo} alt="Logo" className="box-icon11" />
                  <span className=" font-serif text-xs font-medium text-white ml-1 mt-3">
                    60 Days Money Back Guarantee
                    <br />
                    No Questions Asked
                  </span>
                </div>
                <a
                  href="https://cleanersite.netlify.app/checkout"
                  className="btn btn-light bg-green-700 designbtn2 px-3"
                >
                  Purchase Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
{show && (
        <div className="exclusion-main1">
          <div className="container-darfrag testing-class ">
            <div className="">
              <div className="lastScreenResultSecond2  ml-10">                
                <span className="text-lg font-bold">
                Updating the outdated drivers may increase the system speed
                </span>             
              <p className="text-xs font-normal font-sans">Advance Driver Updater's benefits can include faster performance,increased startup speed,<br/> and fewer issue
                message when regularly used</p>
              </div>           
            </div>        
            <div className="StartScan flex justify-content-between againedit">
            <table class="table table-bordered">
              <thead>
                <th scope="col" className="pl-14">
                Total Outdated Drivers
                </th>
                <th scope="col" className="pl-52">
                Status
                </th>
              </thead>
              <tbody>
                <th scope="row" className="pl-14">2 Outdated drivers</th>
                <th className="pl-52">Out-Dated</th>
              </tbody>
              </table>                      
            </div>
<span className="text-xs pl-32">To update the remaining outdated drivers click <a className="underline">Purchase now</a> </span>
            <div className="footer2 bottom-0">
            <div className="row">
              <div className="flex justify-content-between ">
                <div className="flex">
                  <img src={Logo} alt="Logo" className="box-icon112" />
                  <span className="  text-xs font-medium text-black ml-1 mt-2.5">
                    <span className="font-bold text-sm"> Improve performance, or your money back</span>
                    <br />
                    <span className="font-medium">Rest assured, If you are not completely happy with the product, contact us within 60 days of your purchase and we will refund your money. </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div id="pagescanbottomscan" className="fixed-bottom   flex justify-content-end bg-gray-100">
            <button className="btn btn-light designbtn1 border-black text-black">
              View outdated driver
            </button>
            <a className="btn btn-light designbtn1 mr-2 border-black bg-yellow-700 text-white" href="https://cleanersite.netlify.app/checkout">purchase Now </a>
          </div>
        </div>
      )}

{/* for update popup  */}
      {showdriver && (
        <div className="exclusion-maintesting">
        <h1 style={{ marginLeft: "10px", marginTop: "7px" }} className="font-extrabold">
                 <b>Update all your drivers in minutes</b>
                </h1>
                <div onClick={(e) => setShowdriver(false)}>
                  <span className="closeagain "></span>
               </div>    
     <div className="minenewpop">
     {/* <span className="sp">your driverName if you want to update click Update Now</span> */}
     <div className="flex place-content-evenly mt-2 text-xs">
     <span className=""> Device Name : WAN Miniport (Network Monitor)</span>
       <span>Version:f8458475429</span>
       <span>{currentDate}</span>
     </div>
     <div className="StartScan flex justify-content-between">
        <div className="mt-2">
          <img src={giphy} alt="" className="imageofscan mr-3" />
        </div>
        <div>
          <div className="progress11">
            <div className="progress-bar bg-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{ width: `${percentage}%` }}
              aria-valuenow={percentage} >
            
              <span>{percentage.toFixed()}%</span>
          
            </div>

          </div>
            {updateCompleted && (
                <div className="update-completed-message text-black mssg">
                    Drivers updated successfully!
                </div>
            )}
        </div>
      </div>
     </div>
     <div id="pagescanbottomscanagain" className="fixed-bottom   flex justify-content-end bg-gray-100">
     <a className="btn btn-light designbtn10 mr-2 border-black bg-green-700 text-white px-3" href="" onClick={(e) => setShowdriver(false)}>Ok </a>
     </div>
     </div>
      )}
    </>
  ) : (
    <Setting value="Scan" />
  );
}
