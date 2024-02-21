import React, { useState, useEffect } from "react";
import StartScan from "./StartScan";
import desktop from "../Image/desktop.png";
import WindowIcon from "@mui/icons-material/Window";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import intel from "../Image/intel.png";
import minewin from "../Image/minewin.png";
// import grapgics from "../Image/gragics.jpg"

function Status() {
  const [cleanerStart, setCleanerStart] = useState("status");
  const [systemInfo, setSystemInfo] = useState(null);
  const [error, setError] = useState(null);
  const [driverData, setDriverData] = useState([]);
  const [driverCount, setDriverCount] = useState(0);
  const [systemInformation, setSystemInformation] = useState({
    "WAN Miniport (Network Monitor)": "10.0.22621.3",
    "WAN Miniport (IPv6)": "10.0.22621.3",
    "WAN Miniport (IP)": "10.0.22621.4",
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
    Volume: "10.0.22621.1",
    "Generic volume shadow copy": "10.0.22621.1",
    "Volume Manager": "10.0.22621.2506",
  });
  const [comparisonResult, setComparisonResult] = useState([]);
  const [lastScanDateTime, setLastScanDateTime] = useState(null); // New state for last scan date and time
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
              frontendDriver.DriverVersion >= backendDriverVersion;

            updatedComparisonResult.push({
              deviceName,
              DriverVersion: frontendDriver.DriverVersion,
              DriverStatus: isUpToDate ? "Up to date" : "Outdated",
            });
          }
        });
        setComparisonResult(updatedComparisonResult);
        setLastScanDateTime(new Date().toLocaleString());
      } catch (error) {
        console.error("Error fetching driver information:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const response = await axios.get("http://localhost:3000/systeminfo");
        const data = response.data;
        const diskInfoGB = data.diskInfo.map((size) => `${size} GB`);
        const memoryInfoGB = data.memoryInfo.map((size) => `${size} GB`);
        setSystemInfo({
          cpuInfo: data.cpuInfo,
          osInfo: data.osInfo,
          diskInfo: diskInfoGB,
          memoryInfo: memoryInfoGB,
          videoControllerInfo: data.videoControllerInfo,
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
                      {" "}
                      {
                        comparisonResult.filter(
                          (driver) => driver.DriverStatus === "Outdated"
                        ).length
                      }{" "}
                      outdated driver found
                    </h3>
                    <h6 className="text-xs font-medium">
                      Last Scan : {lastScanDateTime}{" "}
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
                      {" "}
                      {/* <img src={intel} alt="" className="box-icon "/> */}
                      <WindowIcon color="primary" className="box-icon " />
                    </div>
                    <div className="flex justify-content-between ">
                      <h6 className="text-black  ml-4 mt-2 ">
                        {" "}
                        <div className="text-xs">System</div>{" "}
                        <h5 className="mr-3 text-sm font-semibold font-sans whitespace-nowrap	truncate-text">
                          {systemInfo.osInfo}
                        </h5>
                      </h6>
                      <h6 className="text-black  ml-9 mt-2">
                        <div className="text-xs">Memory(RAM)</div>{" "}
                        <h5 className="ml-7 text-sm font-semibold font-sans">
                          {systemInfo.memoryInfo.join(", ")}
                        </h5>
                      </h6>
                      <h6 className="text-black  ml-9 mt-2">
                        <div className="text-xs whitespace-nowrap	">
                          Hard Drive{" "}
                        </div>{" "}
                        <h5 className="text-sm font-semibold font-sans whitespace-nowrap	">
                          {systemInfo.diskInfo.join(", ")}
                        </h5>
                      </h6>
                    </div>
                  </div>
                  <ul className="ml-5">
                    <div className="flex mt-2">
                      <img src={intel} alt="" className="box-icon " />
                      {/* <WindowIcon color="primary"  /> */}
                      <li className="text-black ">
                        <h6 className="disable text-xs">Processor</h6>{" "}
                        <h5 className="text-sm font-semibold font-sans whitespace-nowrap	">
                          {systemInfo.cpuInfo}
                        </h5>{" "}
                      </li>
                    </div>
                    <div className="flex mt-2">
                      <WindowIcon color="primary" className="box-icon " />
                      {/* <img src={grapgics} alt=""  className="box-icon "/> */}
                      <li className="text-black ">
                        <h6 className="text-xs">Graphics</h6>{" "}
                        <h5 className="text-sm font-semibold font-sans">
                          {systemInfo.videoControllerInfo}
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
