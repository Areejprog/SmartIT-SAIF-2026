const API_URL = "http://127.0.0.1:8000";

let tickets = [];
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

        populateAssetSelect();
        populateEditAssetSelect();

    } catch (error) {

        console.error("Error loading assets:", error);

        alert("Unable to load devices.");
    }
}


// =========================================================
// Populate Create Ticket Device Select
// =========================================================

function populateAssetSelect() {

    const select = document.getElementById("ticketAsset");

    if (!select) return;

    select.innerHTML = `
        <option value="">
            Choose a device
        </option>
    `;

    assets.forEach(asset => {

        const option = document.createElement("option");

        option.value = asset.id;

        option.textContent =
            `${asset.asset_id} - ${asset.name}`;

        select.appendChild(option);

    });
}


// =========================================================
// Populate Edit Ticket Device Select
// =========================================================

function populateEditAssetSelect() {

    const select =
        document.getElementById("editTicketAsset");

    if (!select) return;

    select.innerHTML = `
        <option value="">
            Select Device
        </option>
    `;

    assets.forEach(asset => {

        const option =
            document.createElement("option");

        option.value = asset.id;

        option.textContent =
            `${asset.asset_id} - ${asset.name}`;

        select.appendChild(option);

    });
}


// =========================================================
// Device Selected
// =========================================================

const ticketAssetSelect =
    document.getElementById("ticketAsset");

if (ticketAssetSelect) {

    ticketAssetSelect.addEventListener(
        "change",
        showSelectedDevice
    );

}


function showSelectedDevice() {

    const assetId =
        Number(
            document.getElementById(
                "ticketAsset"
            ).value
        );

    const asset =
        assets.find(
            item => item.id === assetId
        );


    if (!asset) {

        document.getElementById(
            "infoDeviceName"
        ).textContent = "-";

        document.getElementById(
            "infoDeviceType"
        ).textContent = "-";

        document.getElementById(
            "infoEmployee"
        ).textContent = "-";

        document.getElementById(
            "infoDepartment"
        ).textContent = "-";

        document.getElementById(
            "infoSerial"
        ).textContent = "-";

        document.getElementById(
            "infoAge"
        ).textContent = "-";

        return;
    }


    document.getElementById(
        "infoDeviceName"
    ).textContent =
        asset.name || "-";


    document.getElementById(
        "infoDeviceType"
    ).textContent =
        asset.type || "-";


    document.getElementById(
        "infoEmployee"
    ).textContent =
        asset.employee_name || "-";


    document.getElementById(
        "infoDepartment"
    ).textContent =
        asset.department || "-";


    document.getElementById(
        "infoSerial"
    ).textContent =
        asset.serial_number || "-";


    document.getElementById(
        "infoAge"
    ).textContent =
        calculateDeviceAge(
            asset.purchase_date
        );
}


// =========================================================
// Calculate Device Age
// =========================================================

function calculateDeviceAge(purchaseDate) {

    if (!purchaseDate) {
        return "-";
    }

    const purchase =
        new Date(purchaseDate);

    const today =
        new Date();

    if (isNaN(purchase.getTime())) {
        return "-";
    }

    let years =
        today.getFullYear()
        -
        purchase.getFullYear();

    const monthDifference =
        today.getMonth()
        -
        purchase.getMonth();

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
            (
                today.getFullYear()
                -
                purchase.getFullYear()
            ) * 12
            +
            today.getMonth()
            -
            purchase.getMonth();

        if (
            today.getDate()
            <
            purchase.getDate()
        ) {
            months--;
        }

        if (months <= 0) {
            return "Less than 1 year";
        }

        return `${months} month${
            months > 1 ? "s" : ""
        }`;
    }

    return `${years} year${
        years > 1 ? "s" : ""
    }`;
}


// =========================================================
// Load Tickets
// =========================================================

async function loadTickets() {

    try {

        const response =
            await fetch(
                `${API_URL}/tickets`
            );

        if (!response.ok) {
            throw new Error(
                "Failed to load tickets"
            );
        }

        tickets =
            await response.json();

        renderTickets(tickets);

        updateTicketCount(tickets.length);

    } catch (error) {

        console.error(
            "Error loading tickets:",
            error
        );

        alert(
            "Unable to load tickets."
        );
    }
}


// =========================================================
// Generate Ticket ID
// =========================================================

function generateTicketId() {

    return (
        "TCK-" +
        Date.now()
            .toString()
            .slice(-6)
    );
}


// =========================================================
// Add Ticket
// =========================================================

async function addTicket() {

    const assetId =
        document.getElementById(
            "ticketAsset"
        ).value;

    const service =
        document.getElementById(
            "ticketService"
        ).value;

    const priority =
        document.getElementById(
            "ticketPriority"
        ).value;

    const status =
        document.getElementById(
            "ticketStatus"
        ).value;

    const ticketDate =
        document.getElementById(
            "ticketDate"
        ).value;

    const description =
        document.getElementById(
            "ticketDescription"
        ).value.trim();


    if (!assetId) {

        alert(
            "Please select a device."
        );

        return;
    }


    if (!service) {

        alert(
            "Please select the required service."
        );

        return;
    }


    if (!ticketDate) {

        alert(
            "Please select the ticket date."
        );

        return;
    }


    const ticketIdInput =
        document.getElementById(
            "ticketId"
        );


    const ticketId =
        ticketIdInput.value.trim()
        ||
        generateTicketId();


    const ticketData = {

        ticket_id: ticketId,

        service_type: service,

        title: service,

        description:
            description || null,

        priority,

        status,

        ticket_date:
            ticketDate,

        asset_id:
            Number(assetId)
    };


    try {

        const response =
            await fetch(
                `${API_URL}/tickets`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            ticketData
                        )
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.detail ||
                "Failed to create ticket."
            );

            return;
        }


        alert(
            "Service ticket created successfully."
        );


        clearTicketForm();

        await loadTickets();


    } catch (error) {

        console.error(
            "Error creating ticket:",
            error
        );

        alert(
            "Unable to connect to Smart IT API."
        );
    }
}


// =========================================================
// Clear Form
// =========================================================

function clearTicketForm() {

    document.getElementById(
        "ticketId"
    ).value = "";


    document.getElementById(
        "ticketAsset"
    ).value = "";


    document.getElementById(
        "ticketService"
    ).value = "";


    document.getElementById(
        "ticketPriority"
    ).value = "Medium";


    document.getElementById(
        "ticketStatus"
    ).value = "Open";


    document.getElementById(
        "ticketDate"
    ).value = "";


    document.getElementById(
        "ticketDescription"
    ).value = "";


    showSelectedDevice();
}


// =========================================================
// Find Asset
// =========================================================

function getAssetById(id) {

    return assets.find(
        asset => asset.id === id
    );
}


// =========================================================
// Render Tickets
// =========================================================

function renderTickets(data) {

    const table =
        document.getElementById(
            "ticketsTable"
        );

    table.innerHTML = "";


    if (!data.length) {

        table.innerHTML = `
            <tr>
                <td
                    colspan="10"
                    style="text-align:center; padding:30px;"
                >
                    No service tickets found.
                </td>
            </tr>
        `;

        return;
    }


    data.forEach(ticket => {

        const row =
            document.createElement("tr");


        const asset =
            getAssetById(
                ticket.asset_id
            );


        const deviceName =
            asset?.name || "-";


        const deviceType =
            asset?.type || "-";


        const employee =
            asset?.employee_name || "-";


        const department =
            asset?.department || "-";


        row.innerHTML = `

            <td>
                ${ticket.ticket_id}
            </td>

            <td>
                ${deviceName}
            </td>

            <td>
                ${deviceType}
            </td>

            <td>
                ${employee}
            </td>

            <td>
                ${department}
            </td>

            <td>
                ${ticket.service_type ||
                    ticket.title ||
                    "-"}
            </td>

            <td>
                ${ticket.ticket_date || "-"}
            </td>

            <td>
                ${ticket.priority || "-"}
            </td>

            <td>
                ${ticket.status || "-"}
            </td>

            <td class="ticket-actions-cell">

                <div class="ticket-action-buttons">

                    <button
                        type="button"
                        class="ticket-action-btn edit-btn"
                        onclick="editTicket(${ticket.id})"
                        title="Edit Ticket"
                        aria-label="Edit Ticket"
                    >
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button
                        type="button"
                        class="ticket-action-btn delete-btn"
                        onclick="deleteTicket(${ticket.id})"
                        title="Delete Ticket"
                        aria-label="Delete Ticket"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            </td>

        `;


        table.appendChild(row);

    });
}


// =========================================================
// Update Ticket Count
// =========================================================

function updateTicketCount(count) {

    const counter =
        document.getElementById(
            "ticketCount"
        );

    if (!counter) return;

    counter.textContent =
        `${count} service ticket${
            count === 1 ? "" : "s"
        }`;
}


// =========================================================
// Search Tickets
// =========================================================

function searchTickets() {

    const searchValue =
        document
            .getElementById(
                "searchTicket"
            )
            .value
            .toLowerCase()
            .trim();


    const filtered =
        tickets.filter(ticket => {

            const asset =
                getAssetById(
                    ticket.asset_id
                );


            return (

                (
                    ticket.ticket_id
                    || ""
                )
                .toLowerCase()
                .includes(
                    searchValue
                )

                ||

                (
                    ticket.service_type
                    ||
                    ticket.title
                    ||
                    ""
                )
                .toLowerCase()
                .includes(
                    searchValue
                )

                ||

                (
                    asset?.name
                    || ""
                )
                .toLowerCase()
                .includes(
                    searchValue
                )

                ||

                (
                    asset?.employee_name
                    || ""
                )
                .toLowerCase()
                .includes(
                    searchValue
                )

                ||

                (
                    asset?.department
                    || ""
                )
                .toLowerCase()
                .includes(
                    searchValue
                )

            );

        });


    renderTickets(filtered);

    updateTicketCount(filtered.length);
}


// =========================================================
// Open Edit Ticket
// =========================================================

function editTicket(id) {

    const ticket =
        tickets.find(
            item => item.id === id
        );


    if (!ticket) {

        alert(
            "Ticket not found."
        );

        return;
    }


    document.getElementById(
        "editTicketId"
    ).value =
        ticket.id;


    document.getElementById(
        "editTicketNumber"
    ).value =
        ticket.ticket_id;


    document.getElementById(
        "editTicketAsset"
    ).value =
        ticket.asset_id || "";


    document.getElementById(
        "editTicketService"
    ).value =
        ticket.service_type ||
        ticket.title ||
        "";


    document.getElementById(
        "editTicketPriority"
    ).value =
        ticket.priority ||
        "Medium";


    document.getElementById(
        "editTicketStatus"
    ).value =
        ticket.status ||
        "Open";


    document.getElementById(
        "editTicketDate"
    ).value =
        ticket.ticket_date ||
        "";


    document.getElementById(
        "editTicketDescription"
    ).value =
        ticket.description ||
        "";


    document.getElementById(
        "editTicketModal"
    ).classList.add(
        "show"
    );


    document.body.classList.add(
        "modal-open"
    );
}


// =========================================================
// Close Edit Ticket
// =========================================================

function closeEditTicket() {

    const modal =
        document.getElementById(
            "editTicketModal"
        );


    if (!modal) return;


    modal.classList.remove(
        "show"
    );


    document.body.classList.remove(
        "modal-open"
    );
}


// =========================================================
// Save Edited Ticket
// =========================================================

async function saveEditedTicket() {

    const id =
        Number(
            document.getElementById(
                "editTicketId"
            ).value
        );


    const ticket =
        tickets.find(
            item => item.id === id
        );


    if (!ticket) {

        alert(
            "Ticket not found."
        );

        return;
    }


    const assetId =
        document.getElementById(
            "editTicketAsset"
        ).value;


    const service =
        document.getElementById(
            "editTicketService"
        ).value;


    const priority =
        document.getElementById(
            "editTicketPriority"
        ).value;


    const status =
        document.getElementById(
            "editTicketStatus"
        ).value;


    const ticketDate =
        document.getElementById(
            "editTicketDate"
        ).value;


    const description =
        document.getElementById(
            "editTicketDescription"
        ).value.trim();


    if (!assetId) {

        alert(
            "Please select a device."
        );

        return;
    }


    if (!service) {

        alert(
            "Please select a service."
        );

        return;
    }


    if (!ticketDate) {

        alert(
            "Please select the ticket date."
        );

        return;
    }


    const updatedTicket = {

        ticket_id:
            ticket.ticket_id,

        service_type:
            service,

        title:
            service,

        description:
            description || null,

        priority:
            priority,

        status:
            status,

        ticket_date:
            ticketDate,

        asset_id:
            Number(assetId)
    };


    try {

        const response =
            await fetch(
                `${API_URL}/tickets/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            updatedTicket
                        )
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.detail ||
                "Failed to update ticket."
            );

            return;
        }


        alert(
            "Ticket updated successfully."
        );


        closeEditTicket();


        await loadTickets();


    } catch (error) {

        console.error(
            "Error updating ticket:",
            error
        );


        alert(
            "Unable to connect to Smart IT API."
        );
    }
}


// =========================================================
// Delete Ticket
// =========================================================

async function deleteTicket(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this ticket?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/tickets/${id}`,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.detail ||
                "Failed to delete ticket."
            );

            return;
        }


        alert(
            "Ticket deleted successfully."
        );


        await loadTickets();


    } catch (error) {

        console.error(
            "Error deleting ticket:",
            error
        );


        alert(
            "Unable to connect to Smart IT API."
        );
    }
}


// =========================================================
// Initialize
// =========================================================

async function initializeTicketsPage() {

    await loadAssets();

    await loadTickets();

}


initializeTicketsPage();