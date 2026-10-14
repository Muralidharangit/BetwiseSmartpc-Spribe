pub mod commands;
pub mod hardware;
pub mod services;

use commands::{clear_app_cache, get_hardware_status, get_machine_information, get_system_time, print_ticket_native};
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(
            tauri_plugin_log::Builder::default()
                .level(log::LevelFilter::Info)
                .build(),
        )
        .setup(|app| {
            if let Some(window) = app.get_webview_window("main") {
                // Clear all webview browsing data (cache, service workers, cookies, storage) on launch
                let _ = window.clear_all_browsing_data();
            }
            if let Ok(cache_dir) = app.path().app_cache_dir() {
                if cache_dir.exists() {
                    let _ = std::fs::remove_dir_all(&cache_dir);
                }
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_machine_information,
            get_hardware_status,
            print_ticket_native,
            get_system_time,
            clear_app_cache
        ])
        .run(tauri::generate_context!())
        .expect("error while building tauri application");
}
