const API_URL = "http://127.0.0.1:8000";

let assets = [];


// =========================================================
// Load Assets
// =========================================================

async function loadAssets() {

    try {

        const response = await fetch(`${API_URL}/assets`);

        if (!response.ok) {
            throw new Error("Failed to load assets");
        }

        assets = await response.json();

        renderAssets(assets);

    } catch (error) {

        console.error("Error loading assets:", error);

        alert("Unable to load assets.");

    }
}


// =========================================================
// Calculate Device Age
// =========================================================

function calculateDeviceAge(purchaseDate) {

    if (!purchaseDate) {
        return "-";
    }

    const purchase = new Date(purchaseDate);
    const today = new Date();

    if (isNaN(purchase.getTime())) {
        return "-";
    }

    let years = today.getFullYear() - purchase.getFullYear();

    const monthDifference =
        today.getMonth() - purchase.getMonth();

    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            today.getDate() < purchase.getDate()
        )
    ) {

        years--;

    }

    if (years < 0) {
        return "Invalid date";
    }

    if (years === 0) {

        let months =
            (today.getFullYear() - purchase.getFullYear()) * 12
            + today.getMonth()
            - purchase.getMonth();

        if (today.getDate() < purchase.getDate()) {
            months--;
        }

        if (months <= 0) {
            return "Less than 1 year";
        }

        return `${months} month${months > 1 ? "s" : ""}`;
    }

    return `${years} year${years > 1 ? "s" : ""}`;
}


// =========================================================
// Add Asset
// =========================================================

async function addAsset() {

    const name =
        document.getElementById("assetName").value.trim();

    const type =
        document.getElementById("assetType").value;

    const department =
        document.getElementById("assetDepartment").value.trim();

    const employee =
        document.getElementById("assetEmployee").value.trim();

    const serialNumber =
        document.getElementById("assetSerial").value.trim();

    const location =
        document.getElementById("assetLocation").value.trim();

    const purchaseDate =
        document.getElementById("assetPurchaseDate").value;

    const status =
        document.getElementById("assetStatus").value;


    // Validation

    if (!name) {

        alert("Please enter the device name.");

        return;
    }


    if (!type) {

        alert("Please select the device type.");

        return;
    }


    if (!department) {

        alert("Please enter the department.");

        return;
    }


    if (!purchaseDate) {

        alert("Please enter the purchase date.");

        return;
    }


    // Generate internal Smart IT Asset ID

    const assetId =
        "AST-" +
        Date.now().toString().slice(-6);


    const assetData = {

        asset_id: assetId,

        serial_number:
            serialNumber || null,

        name: name,

        type: type,

        department: department,

        employee_name:
            employee || null,

        location:
            location || null,

        purchase_date:
            purchaseDate,

        status: status

    };


    try {

        const response = await fetch(
            `${API_URL}/assets`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(assetData)
            }
        );


        const data = await response.json();


        if (!response.ok) {

            alert(
                data.detail ||
                "Failed to add asset."
            );

            return;
        }


        alert("Asset added successfully.");


        clearAssetForm();

        loadAssets();


    } catch (error) {

        console.error("Error adding asset:", error);

        alert("Unable to connect to Smart IT API.");

    }
}


// =========================================================
// Clear Form
// =========================================================

function clearAssetForm() {

    document.getElementById("assetName").value = "";

    document.getElementById("assetType").value = "";

    document.getElementById("assetDepartment").value = "";

    document.getElementById("assetEmployee").value = "";

    document.getElementById("assetSerial").value = "";

    document.getElementById("assetLocation").value = "";

    document.getElementById("assetPurchaseDate").value = "";

    document.getElementById("assetStatus").value = "Active";
}


// =========================================================
// Render Assets
// =========================================================

function renderAssets(data) {

    const table =
        document.getElementById("assetsTable");

    table.innerHTML = "";


    data.forEach(asset => {

        const row =
            document.createElement("tr");


        const deviceAge =
            calculateDeviceAge(
                asset.purchase_date
            );


        row.innerHTML = `

            <td>
                ${asset.asset_id || "-"}
            </td>

            <td>
                ${asset.serial_number || "-"}
            </td>

            <td>
                ${asset.name || "-"}
            </td>

            <td>
                ${asset.type || "-"}
            </td>

            <td>
                ${asset.department || "-"}
            </td>

            <td>
                ${asset.employee_name || "-"}
            </td>

            <td>
                ${asset.purchase_date || "-"}
            </td>

            <td>
                ${deviceAge}
            </td>

            <td>
                ${asset.status || "-"}
            </td>

            <td>

                <button
                    onclick="editAsset(${asset.id})"
                >
                    Edit
                </button>

                <button
                    onclick="deleteAsset(${asset.id})"
                >
                    Delete
                </button>

            </td>

        `;


        table.appendChild(row);

    });
}


// =========================================================
// Edit Asset
// =========================================================

async function editAsset(id) {

    const asset =
        assets.find(item => item.id === id);


    if (!asset) {
        return;
    }


    const name =
        prompt(
            "Device Name:",
            asset.name || ""
        );


    if (name === null) {
        return;
    }


    const type =
        prompt(
            "Device Type:",
            asset.type || ""
        );


    if (type === null) {
        return;
    }


    const department =
        prompt(
            "Department:",
            asset.department || ""
        );


    if (department === null) {
        return;
    }


    const employee =
        prompt(
            "Employee Name:",
            asset.employee_name || ""
        );


    if (employee === null) {
        return;
    }


    const serialNumber =
        prompt(
            "Serial Number:",
            asset.serial_number || ""
        );


    if (serialNumber === null) {
        return;
    }


    const location =
        prompt(
            "Location:",
            asset.location || ""
        );


    if (location === null) {
        return;
    }


    const purchaseDate =
        prompt(
            "Purchase Date (YYYY-MM-DD):",
            asset.purchase_date || ""
        );


    if (purchaseDate === null) {
        return;
    }


    const status =
        prompt(
            "Status:",
            asset.status || "Active"
        );


    if (status === null) {
        return;
    }


    const updatedAsset = {

        asset_id:
            asset.asset_id,

        serial_number:
            serialNumber || null,

        name:
            name,

        type:
            type,

        department:
            department || null,

        employee_name:
            employee || null,

        location:
            location || null,

        purchase_date:
            purchaseDate || null,

        status:
            status

    };


    try {

        const response =
            await fetch(
                `${API_URL}/assets/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            updatedAsset
                        )
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.detail ||
                "Failed to update asset."
            );

            return;
        }


        alert("Asset updated successfully.");

        loadAssets();


    } catch (error) {

        console.error(
            "Error updating asset:",
            error
        );

        alert(
            "Unable to connect to Smart IT API."
        );

    }
}


// =========================================================
// Delete Asset
// =========================================================

async function deleteAsset(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this asset?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/assets/${id}`,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.detail ||
                "Failed to delete asset."
            );

            return;
        }


        alert("Asset deleted successfully.");

        loadAssets();


    } catch (error) {

        console.error(
            "Error deleting asset:",
            error
        );

        alert(
            "Unable to connect to Smart IT API."
        );

    }
}


// =========================================================
// Search Assets
// =========================================================

function searchAssets() {

    const searchValue =
        document
            .getElementById("searchAsset")
            .value
            .toLowerCase()
            .trim();


    const filtered =
        assets.filter(asset =>

            (
                asset.asset_id || ""
            )
            .toLowerCase()
            .includes(searchValue)

            ||

            (
                asset.serial_number || ""
            )
            .toLowerCase()
            .includes(searchValue)

            ||

            (
                asset.name || ""
            )
            .toLowerCase()
            .includes(searchValue)

            ||

            (
                asset.type || ""
            )
            .toLowerCase()
            .includes(searchValue)

            ||

            (
                asset.department || ""
            )
            .toLowerCase()
            .includes(searchValue)

            ||

            (
                asset.employee_name || ""
            )
            .toLowerCase()
            .includes(searchValue)

        );


    renderAssets(filtered);
}


// =========================================================
// Start
// =========================================================

loadAssets();