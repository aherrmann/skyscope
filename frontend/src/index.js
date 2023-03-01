window.onload = function() {
    const checkboxes = [];
    for (const checkbox of document.getElementsByClassName("delete")) {
        checkboxes.push(checkbox);
    }
    const getCheckedCount = () => checkboxes.filter(c => c.checked).length;
    const button = document.getElementById("button");
    const update = () => {
        if (getCheckedCount() == 0) {
            button.value = "Select All";
        } else {
            button.value = "Delete";
        }
    };
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.onchange = e => update();
    });
    button.onclick = e => {
        if (getCheckedCount() == 0) {
            checkboxes.forEach(checkbox => checkbox.checked = true);
            update();
        } else {
            const deleteList = checkboxes.filter(c => c.checked);
            let deletingCount = deleteList.length
            deleteList.forEach(checkbox => {
                fetch(checkbox.parentNode.id, { method: "DELETE" }).then(response => {
                    if (!response.ok) {
                        throw new Error("DELETE failed: " + response.statusText);
                    }
                    deletingCount = deletingCount - 1;
                    if (deletingCount == 0) {
                        location.reload();
                    }
                });
            });
        }
    };
}