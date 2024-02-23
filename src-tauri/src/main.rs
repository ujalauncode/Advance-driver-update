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


use tauri::{command};

#[derive(Debug, serde::Serialize)]
struct SystemInfo {
    cpu_info: String,
    os_info: String,
    disk_info_bytes: u64,
    memory_info_bytes: u64,
}

#[command]
fn system_info() -> SystemInfo {
    let cpu_info = get_cpu_info();
    let os_info = get_os_info();
    let disk_info_bytes = get_disk_info_bytes();
    let memory_info_bytes = get_memory_info_bytes();

    SystemInfo {
        cpu_info,
        os_info,
        disk_info_bytes,
        memory_info_bytes,
    }
}

fn get_cpu_info() -> String {
    "Intel Core i7-8700K".to_string()
}

fn get_os_info() -> String {
    "Windows 10".to_string()
}

fn get_disk_info_bytes() -> u64 {  
    1024 * 1024 * 1024 * 100 // 100 GB
}
fn get_memory_info_bytes() -> u64 {
    1024 * 1024 * 16 // 16 GB
}



#[derive(Debug, serde::Serialize)]
struct WindowsUpdateInfo {
    // Define the fields you want to capture
    // For simplicity, let's just capture the output of the command
    output: String,
}

#[command]
fn get_windows_update() -> WindowsUpdateInfo {
    // Execute the PowerShell command to get Windows Update information
    let output = match Command::new("powershell")
        .args(&["-Command", "Get-WindowsUpdate"])
        .output()
    {
        Ok(output) => {
            // Convert the output bytes to a UTF-8 string
            String::from_utf8_lossy(&output.stdout).to_string()
        }
        Err(error) => {
            // If there's an error executing the command, return the error message
            format!("Error executing PowerShell command: {}", error)
        }
    };

    WindowsUpdateInfo { output }
}




fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, mine_driver, system_info,get_windows_update])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}