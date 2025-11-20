document.getElementById("myForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        bhk: document.getElementById("bhk").value
    };

    try {
        const res = await fetch("https://backendaruh2.vercel.app/api/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (data.success) {
            alert("Form submitted successfully!");
        } else {
            alert("Error: " + data.error);
        }

    } catch (error) {
        alert("Something went wrong. Try again.");
        console.error(error);
    }
});
