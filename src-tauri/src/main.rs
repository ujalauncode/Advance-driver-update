// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]

fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// src-tauri/src/main.rs

// #[tauri::command]
// fn fetch_driver_info() -> Result<String, Box<dyn std::error::Error>> {
// let output = std::process::Command::new("powershell")
//         .args(&["-Command", "$driverInfo = Get-WmiObject Win32_PnPSignedDriver | Select-Object DeviceName, DriverVersion, DriverStatus; ConvertTo-Json $driverInfo"])
//         .output()?;
    
//     let result = String::from_utf8_lossy(&output.stdout).to_string();
//     Ok(result)
// }


// use std::process::Command;
// use serde_json::Value;

// #[tauri::command]
// fn mine_driver() -> String {
//     let output = Command::new("powershell")
//     .arg("-Command")
//     .arg("$driverInfo = Get-WmiObject Win32_PnPSignedDriver | Select-Object DeviceName, DriverVersion, DriverStatus; ConvertTo-Json $driverInfo")
//     .output()
//     .expect("Failed to execute command");

// let stdout = String::from_utf8_lossy(&output.stdout);
// let parsed_json: Value = serde_json::from_str(&stdout).expect("Failed to parse JSON");
// println!("{:?}", parsed_json);
//     "Driver information".to_string()
// }


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

// fn my_custom_command() {   
//   println!("hello from fronted to rust!");
// }


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, mine_driver])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}