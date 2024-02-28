// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]

fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}


use std::process::Command;
use serde_json::Value;

#[tauri::command]
fn mine_driver() -> Result<String, String> {
    let output = Command::new("powershell")
        .arg("-Command")
        .arg("$driverInfo = Get-WmiObject Win32_PnPSignedDriver | Select-Object DeviceName, DriverVersion, DriverStatus; ConvertTo-Json $driverInfo")
        .output()
        .map_err(|e| format!("Failed to execute command: {}", e))?;

    let stdout = String::from_utf8_lossy(&output.stdout);
    let parsed_json: Value = serde_json::from_str(&stdout)
        .map_err(|e| format!("Failed to parse JSON: {}", e))?;

    Ok(stdout.to_string())
}

// #[tauri::command]
// fn __cmd__testing() -> String {
//     let output = Command::new("SystemInfo")
//         .output()
//         .expect("Failed to execute command");
//     let output_str = String::from_utf8_lossy(&output.stdout);

//     output_str.to_string()
// }


// this is for system info


use serde::Serialize;

#[derive(Serialize)]
struct SystemInfo {
    os_info: String,
    cpu_info: String,
    disk_info: String,
    video_controller_info: String,
    product_id: String, 
    memory_info: String,
}

#[tauri::command]
fn __cmd__testing() -> SystemInfo {
    use std::process::Command;

    let os_info = Command::new("wmic")
        .args(&["os", "get", "Caption"])
        .output()
        .expect("Failed to execute command");
    let os_info_str = String::from_utf8_lossy(&os_info.stdout).lines().nth(1).unwrap_or("").trim().to_string();

    let cpu_info = Command::new("wmic")
        .args(&["cpu", "get", "name"])
        .output()
        .expect("Failed to execute command");
    let cpu_info_str = String::from_utf8_lossy(&cpu_info.stdout).lines().nth(1).unwrap_or("").trim().to_string();

    let disk_info = Command::new("wmic")
        .args(&["diskdrive", "get", "size"])
        .output()
        .expect("Failed to execute command");
    let disk_info_str = String::from_utf8_lossy(&disk_info.stdout).lines().nth(1).unwrap_or("").trim().to_string();
    
    // Convert disk info from bytes to gigabytes
    let disk_info_gb = match disk_info_str.parse::<u64>() {
        Ok(bytes) => bytes / (1024 * 1024 * 1024), // Convert bytes to gigabytes
        Err(_) => 0, // Handle parse errors gracefully
    };
    let disk_info_gb_str = format!("{}", disk_info_gb);

    let video_controller_info = Command::new("wmic")
        .args(&["path", "Win32_VideoController", "get", "name"])
        .output()
        .expect("Failed to execute command");
    let video_controller_info_str = String::from_utf8_lossy(&video_controller_info.stdout).lines().nth(1).unwrap_or("").trim().to_string();

    let product_id = Command::new("wmic")
        .args(&["bios", "get", "serialnumber"])
        .output()
        .expect("Failed to execute command");
    let product_id_str = String::from_utf8_lossy(&product_id.stdout).lines().nth(1).unwrap_or("").trim().to_string();

    let memory_info = Command::new("wmic")
        .args(&["memorychip", "get", "Capacity"])
        .output()
        .expect("Failed to execute command");
    let memory_info_str = String::from_utf8_lossy(&memory_info.stdout).lines().nth(1).unwrap_or("").trim().to_string();

    // Convert memory info from bytes to gigabytes
    let memory_info_gb = match memory_info_str.parse::<u64>() {
        Ok(bytes) => bytes / (1024 * 1024 * 1024), // Convert bytes to gigabytes
        Err(_) => 0, // Handle parse errors gracefully
    };
    let memory_info_gb_str = format!("{}", memory_info_gb);

    SystemInfo {
        os_info: os_info_str,
        cpu_info: cpu_info_str,
        disk_info: disk_info_gb_str,
        video_controller_info: video_controller_info_str,
        product_id: product_id_str,
        memory_info: memory_info_gb_str,
    }
}



// #[tauri::command]
// fn __cmd__testing() -> String {
//     use std::process::Command;

//     let output_system_info = Command::new("SystemInfo")
//         .output()
//         .expect("Failed to execute command");

//     let output_str_system_info = String::from_utf8_lossy(&output_system_info.stdout);

//     let output_os_info = Command::new("wmic")
//         .args(&["os", "get", "Caption"])
//         .output()
//         .expect("Failed to execute command");

//     let output_str_os_info = String::from_utf8_lossy(&output_os_info.stdout);

//     let output_cpu_info = Command::new("wmic")
//         .args(&["cpu", "get", "name"])
//         .output()
//         .expect("Failed to execute command");

//     let output_str_cpu_info = String::from_utf8_lossy(&output_cpu_info.stdout);

//     let output_disk_info = Command::new("wmic")
//         .args(&["diskdrive", "get", "size"])
//         .output()
//         .expect("Failed to execute command");

//     let output_str_disk_info = String::from_utf8_lossy(&output_disk_info.stdout);

//     let output_video_controller_info = Command::new("wmic")
//         .args(&["path", "Win32_VideoController", "get", "name"])
//         .output()
//         .expect("Failed to execute command");

//     let output_str_video_controller_info = String::from_utf8_lossy(&output_video_controller_info.stdout);

//     let mut extracted_info = String::new();

//     for line in output_str_system_info.lines() {
//         if line.starts_with("OS Name:")
//             || line.starts_with("Processor(s):")
//             || line.starts_with("Total Physical Memory:")
//             || line.starts_with("Product ID:")
//         {
//             extracted_info.push_str(line);
//             extracted_info.push('\n');
//         }
//     }

//     extracted_info.push_str("OS Info:\n");
//     extracted_info.push_str(&output_str_os_info);

//     extracted_info.push_str("CPU Info:\n");
//     extracted_info.push_str(&output_str_cpu_info);

//     extracted_info.push_str("Disk Info:\n");
//     extracted_info.push_str(&output_str_disk_info);

//     extracted_info.push_str("Video Controller Info:\n");
//     extracted_info.push_str(&output_str_video_controller_info);

//     extracted_info
// }


// this is to check updates

#[tauri::command]
fn __cmd__checkagain() -> String {
    use std::process::Command;
    let _ = Command::new("powershell")
        .args(&["-Command", "Install-Module -Name PSWindowsUpdate -Force -AllowClobber"])
        .output()
        .expect("Failed to execute PowerShell command to install module");
    let _ = Command::new("powershell")
        .args(&["-Command", "Import-Module PSWindowsUpdate"])
        .output()
        .expect("Failed to execute PowerShell command to import module");

    let check_updates_cmd = Command::new("powershell")
        .args(&["-Command", "Get-WindowsUpdate -MicrosoftUpdate -Summary"])
        .output();

    match check_updates_cmd {
        Ok(output) => {
            let updates_output = String::from_utf8_lossy(&output.stdout);
            
            println!("Updates Output: {}", updates_output);

            if updates_output.contains("No Updates Found") {
                "No updates are available.".to_string()
            } else {
                updates_output.to_string()
            }
        },
        Err(error) => {
            eprintln!("Error executing PowerShell command: {:?}", error);
            "Error executing PowerShell command.".to_string()
        }
    }
}

// use std::process::Command;

#[tauri::command]
fn __cmd__checkupdate() -> String {
    use std::process::Command;

    // Execute PowerShell command to install Windows updates
    let install_updates_cmd = Command::new("powershell")
        .args(&["-Command", "Install-WindowsUpdate"])
        .output();

    match install_updates_cmd {
        Ok(output) => {
            // Check if the command executed successfully
            if output.status.success() {
                return "Windows updates installed successfully.".to_string();
            } else {
                // If the command failed, print the error message
                let error_message = String::from_utf8_lossy(&output.stderr);
                return format!("Error installing Windows updates: {}", error_message);
            }
        }
        Err(err) => {
            // Handle the error if the command couldn't be executed
            return format!("Error executing PowerShell command: {}", err);
        }
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, mine_driver, __cmd__testing,__cmd__checkagain,__cmd__checkupdate])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}