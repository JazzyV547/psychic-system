console.log("supabase.js loaded");

const SUPABASE_URL = "https://ohqkyfajdoaalzfsiibe.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ocWt5ZmFqZG9hYWx6ZnNpaWJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NTg2MTIsImV4cCI6MjA5NzUzNDYxMn0.rqHx6nL564UoCi7GiPjw2jEPJ8Z9VeUcLk7l5LPa3eo";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

// Optimized Auth Listener - Only for email confirmation flow
supabaseClient.auth.onAuthStateChange(async (event, session) => {
    console.log("Auth Event:", event);

    // Only trigger on email confirmation (not on normal login)
    if (event === 'USER_CONFIRMED' && session?.user) {
        
        console.log("✅ Email confirmed for:", session.user.email);

        const user = session.user;

        // Ensure profile exists in users table
        let { data: profile } = await supabaseClient
            .from("users")
            .select("*")
            .eq("id", user.id)
            .maybeSingle();

        if (!profile) {
            const pendingJoin = JSON.parse(localStorage.getItem("pendingJoin"));

            await supabaseClient.from("users").insert({
                id: user.id,
                email: user.email,
                name: user.email.split("@")[0],
                tier: pendingJoin ? pendingJoin.tier : null,
                coin: pendingJoin ? pendingJoin.coin : null,
                amount: pendingJoin ? pendingJoin.amount : 0,
                balance: 0,
                funding_status: "not_started",
                account_status: "Pending Funding",
                approved: false,
                current_milestone: 0,
            });
        }

        // Save user data
        localStorage.setItem("user", JSON.stringify(profile || user));

        // Redirect ONLY to funding page after confirmation
        window.location.href = "escrow-funding.html";
    }
});