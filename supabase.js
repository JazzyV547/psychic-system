console.log("supabase.js loaded");

const SUPABASE_URL = "https://ohqkyfajdoaalzfsiibe.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ocWt5ZmFqZG9hYWx6ZnNpaWJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NTg2MTIsImV4cCI6MjA5NzUzNDYxMn0.rqHx6nL564UoCi7GiPjw2jEPJ8Z9VeUcLk7l5LPa3eo";

window.supabaseClient = null;

function tryCreateClient() {
    // Works with both global `supabase` and some UMD builds
    if (typeof supabase !== "undefined" && supabase.createClient) {
        window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("✅ Supabase client ready");
        return true;
    }
    return false;
}

// Try immediately
if (!tryCreateClient()) {
    console.log("Waiting for Supabase library...");
    let attempts = 0;
    const timer = setInterval(function() {
        attempts++;
        if (tryCreateClient() || attempts >= 30) {
            clearInterval(timer);
            if (!window.supabaseClient) {
                console.error("❌ Supabase library still not found after waiting");
            }
        }
    }, 200);
}
