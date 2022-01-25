$(document).ready(function() {
    //load data
    var current_page = 1;
    var current_search_page = 1;
    var load_search_data = {};
    var user_email_global = "";
    var user_vkey_global = "";
    var user_role_global = "";

    //************ load page function ************//
    load_data(current_page);

    function load_data(page, action) {
        var user_page = {
            pagee: page
        }
        if (action === "search") {
            load_search_data.pagee = current_search_page;
            $.ajax({
                url: "../../../wefixit/backend/api/users/admin_search_pending.php",
                method: "POST",
                data: JSON.stringify(load_search_data),
                success: function(results) {
                    console.log(results);
                    $("#users-table").html('');
                    if (results && results.length == 0) {

                        document.getElementById("users-table").insertAdjacentHTML(
                            "beforeend",
                            `
                                        <div class="col-2" id="page-btn">
                        
                                            <div style="width: 70%;">
                                                <p style="color:#555;font-size: 14px;padding-left:30px;margin-top:15px;">End of results.</p>
                                            </div>
                        
                                            <div class="controls-div" style="display:flex;justify-content:flex-end;text-align:right;">
                                                <button id="prev-page"  class="control-btn"> &#10094; Back </button>
                                            </div>
                        
                                        </div>
                        
                                        `
                        );

                        $('#prev-page').on('click', function(event) {
                            $('#users-table').html('');
                            load_data(1);
                            current_search_page = 1;
                            current_page = 1;
                            $('#prev-page').attr("style", "display:none;");
                        });
                        return;
                    }

                    var $users = $('#users-table');
                    var users_data = '<table style="width: 100%;">';
                    users_data += '<tr>';
                    users_data += '<th>Name</th>';
                    users_data += '<th>Email</th>';
                    users_data += '<th>Joined on</th>';
                    users_data += '<th>Action</th>';
                    users_data += '</tr>';

                    $.each(results, function(key, value) {
                        users_data += '<tr class="tr-user" id="' + value.user_id + '">';
                        users_data += '<td>' + value.name + '</td>';
                        users_data += '<td>' + value.email + '</td>';
                        users_data += '<td>' + value.created_at + '</td>';
                        users_data += '<td> <button class="block-btn"> Block </button></td>';
                        users_data += '</tr>';

                    });
                    users_data += '</table>';
                    $users.append(users_data);

                    document.getElementById("users-table").insertAdjacentHTML(
                        "beforeend",
                        `   
                                <div class="col-2" id="page-btn" >
                
                                    <div class="controls-div">
                                        <button id="prev-page" class="control-btn"> &#10094; Previous </button>
                                        <p style="color:#555;font-size: 20px;
                                            margin-left: 10px;margin-right: 10px;"><u>${current_search_page}</u></p>
                                        <button id="next-page" class="control-btn"> Next &#10095;</button>
                                    </div>
                
                                </div>
                
                        `
                    );

                    if (current_search_page === 1) {
                        $('#prev-page').attr("style", "opacity:0;");
                    } else {
                        $('#prev-page').attr("style", "opacity:1;");
                    }

                    $('#next-page').on('click', function(event) {
                        $('#users-table').html('');
                        var new_page = ++current_search_page;
                        load_data(new_page, "search");
                        current_search_page = new_page;
                    });

                    $('#prev-page').on('click', function(event) {
                        $('#users-table').html('');
                        var new_page = --current_search_page;
                        if (new_page === 0) {
                            load_data(1);
                            current_search_page = 1;
                            $('#prev-page').attr("style", "display:none;");
                        } else {
                            load_data(new_page);
                            current_search_page = new_page;
                        }
                    });

                }
            })

            return;

        }
        var xhttp = new XMLHttpRequest();
        xhttp.open(
            "POST",
            "../../../wefixit/backend/api/users/admin_fetch_all.php"
        );
        xhttp.send(JSON.stringify(user_page));
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let results = JSON.parse(this.response);
                // console.log(results);
                // $("#control-next").html('');
                $("#users-table").html('');

                if (results && results.length == 0) {

                    document.getElementById("users-table").insertAdjacentHTML(
                        "beforeend",
                        `
                                <div class="col-2" id="page-btn">
                
                                    <div style="width: 70%;">
                                        <p style="color:#555;font-size: 14px;padding-left:30px;margin-top:15px;">End of results.</p>
                                    </div>
                
                                    <div class="controls-div" style="display:flex;justify-content:flex-end;text-align:right;">
                                        <button id="prev-page"  class="control-btn"> &#10094; Back </button>
                                    </div>
                
                                </div>
                
                                `
                    );

                    $('#prev-page').on('click', function(event) {
                        $('#users-table').html('');
                        load_data(1);
                        current_search_page = 1;
                        current_page = 1;
                        $('#prev-page').attr("style", "display:none;");
                    });
                    return;
                }

                var $users = $('#users-table');
                var users_data = '<table style="width: 100%;">';
                users_data += '<tr>';
                users_data += '<th>Name</th>';
                users_data += '<th>Email</th>';
                users_data += '<th>Joined on</th>';
                users_data += '<th>Action</th>';
                users_data += '</tr>';

                $.each(results, function(key, value) {
                    users_data += '<tr class="tr-user" id="' + value.user_id + '">';
                    users_data += '<td>' + value.name + '</td>';
                    users_data += '<td>' + value.email + '</td>';
                    users_data += '<td>' + value.created_at + '</td>';
                    users_data += '<td> <button class="block-btn"> Block </button></td>';
                    users_data += '</tr>';

                });
                users_data += '</table>';
                $users.append(users_data);

                document.getElementById("users-table").insertAdjacentHTML(
                    "beforeend",
                    `   
                            <div class="col-2" id="page-btn" >
            
                                <div class="controls-div">
                                    <button id="prev-page" class="control-btn"> &#10094; Previous </button>
                                    <p style="color:#555;font-size: 20px;
                                        margin-left: 10px;margin-right: 10px;"><u>${current_page}</u></p>
                                    <button id="next-page" class="control-btn"> Next &#10095;</button>
                                </div>
            
                            </div>
            
                    `
                );

                if (current_page === 1) {
                    $('#prev-page').attr("style", "opacity:0;");
                } else {
                    $('#prev-page').attr("style", "opacity:1;");
                }

                $('#next-page').on('click', function(event) {
                    var new_page = ++current_page;
                    load_data(new_page);
                    current_page = new_page;
                });

                $('#prev-page').on('click', function(event) {
                    var new_page = --current_page;
                    if (new_page === 0) {
                        load_data(1);
                        current_page = 1;
                        $('#prev-page').attr("style", "display:none;");
                    } else {
                        load_data(new_page);
                        current_page = new_page;
                    }
                });
            }
        };
    }

    $(document).on('click', '.tr-user', function() {
        $(".tr-user").attr("style", "background-color:#fff");
        $(this).attr("style", "background-color:#dae6f1");
        var user_get_id = $(this).attr("id");
        var xhttp = new XMLHttpRequest();
        xhttp.open(
            "GET",
            "../../../wefixit/backend/api/users/admin_fetch_one.php?user_id=" + user_get_id
        );
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let results = JSON.parse(this.response);
                $("#input-name").val(results.name);
                $("#input-gender").val(results.gender);
                $("#input-birthday").val(results.birthday);
                $("#input-address").val(results.address);
                $("#id-container").attr("src", results.front_id);
                user_email_global = results.email;
                user_vkey_global = results.vkey;
                user_role_global = results.role;
                console.log(results)

                var slider_img = document.querySelector("#id-container");
                var images = [results.front_id, results.back_id, results.whole_id];
                var i = 0;
                $('#large-img').attr('href', images[i]);

                //image controls
                $(document).on('click', '#prev-id', function() {
                    if (i <= 0) i = images.length;
                    i--;
                    $('#large-img').attr('href', images[i]);
                    return setImg();
                });

                $(document).on('click', '#next-id', function() {
                    if (i >= images.length - 1) i = -1;
                    i++;
                    $('#large-img').attr('href', images[i]);
                    return setImg();
                });

                function setImg() {
                    return slider_img.setAttribute("src", images[i]);
                }

            }
        }

    });

    $(document).on('click', '#btn-approve', function() {
        $("#id03").fadeIn();
    });

    $(document).on('click', '#yes-approve', function() {
        $("#id05").show();
        var send_email_data = {
            email: user_email_global,
            vkey: user_vkey_global,
            role: user_role_global
        }

        var xhttp = new XMLHttpRequest();
        xhttp.open(
            "POST",
            "../../../wefixit/backend/api/users/admin_send_email.php"
        );
        xhttp.send(JSON.stringify(send_email_data));
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 201) {
                $("#id05").hide();
                $("#id03").fadeOut();
                $("#id04").fadeIn();
                current_page = 1;
                load_data(current_page);

            }
        }
    });

    $(document).on('click', '#btn-deny', function() {
        $("#id01").fadeIn();
    });

    $(document).on('click', '#yes-deny', function() {
        $("#id05").show();
        var send_email_data = {
            email: user_email_global,
            vkey: user_vkey_global,
            role: user_role_global
        }

        var xhttp = new XMLHttpRequest();
        xhttp.open(
            "POST",
            "../../../wefixit/backend/api/users/admin_deny_email.php"
        );
        xhttp.send(JSON.stringify(send_email_data));
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 201) {
                $("#id05").hide();
                $("#id01").fadeOut();
                $("#id02").fadeIn();
                current_page = 1;
                load_data(current_page);
            }
        }
    });

    //************ search freelancer data  ************//
    $(document).on('click', '#continue-search', function() {
        var txt = $("#search-txt").val();
        current_search_page = 1;
        var search_data = {
            search: txt,
            filter: "name",
            pagee: current_search_page
        }
        load_search_data = {
            search: txt,
            filter: "name",
        };
        $.ajax({
            url: "../../../wefixit/backend/api/users/admin_search_pending.php",
            method: "POST",
            data: JSON.stringify(search_data),
            success: function(results) {
                console.log(results);
                $("#users-table").html('');
                if (results && results.length == 0) {

                    document.getElementById("users-table").insertAdjacentHTML(
                        "beforeend",
                        `
                                    <div class="col-2" id="page-btn">
                    
                                        <div style="width: 70%;">
                                            <p style="color:#555;font-size: 14px;padding-left:30px;margin-top:15px;">End of results.</p>
                                        </div>
                    
                                        <div class="controls-div" style="display:flex;justify-content:flex-end;text-align:right;">
                                            <button id="prev-page"  class="control-btn"> &#10094; Back </button>
                                        </div>
                    
                                    </div>
                    
                                    `
                    );

                    $('#prev-page').on('click', function(event) {
                        $('#users-table').html('');
                        load_data(1);
                        current_search_page = 1;
                        current_page = 1;
                        $('#prev-page').attr("style", "display:none;");
                    });
                    return;
                }

                var $users = $('#users-table');
                var users_data = '<table style="width: 100%;">';
                users_data += '<tr>';
                users_data += '<th>Name</th>';
                users_data += '<th>Email</th>';
                users_data += '<th>Joined on</th>';
                users_data += '<th>Action</th>';
                users_data += '</tr>';

                $.each(results, function(key, value) {
                    users_data += '<tr class="tr-user" id="' + value.user_id + '">';
                    users_data += '<td>' + value.name + '</td>';
                    users_data += '<td>' + value.email + '</td>';
                    users_data += '<td>' + value.created_at + '</td>';
                    users_data += '<td> <button class="block-btn"> Block </button></td>';
                    users_data += '</tr>';

                });
                users_data += '</table>';
                $users.append(users_data);

                document.getElementById("users-table").insertAdjacentHTML(
                    "beforeend",
                    `   
                            <div class="col-2" id="page-btn" >
            
                                <div class="controls-div">
                                    <button id="prev-page" class="control-btn"> &#10094; Previous </button>
                                    <p style="color:#555;font-size: 20px;
                                        margin-left: 10px;margin-right: 10px;"><u>${current_search_page}</u></p>
                                    <button id="next-page" class="control-btn"> Next &#10095;</button>
                                </div>
            
                            </div>
            
                    `
                );

                if (current_search_page === 1) {
                    $('#prev-page').attr("style", "opacity:0;");
                } else {
                    $('#prev-page').attr("style", "opacity:1;");
                }

                $('#next-page').on('click', function(event) {
                    $('#users-table').html('');
                    var new_page = ++current_search_page;
                    load_data(new_page, "search");
                    current_search_page = new_page;
                });

                $('#prev-page').on('click', function(event) {
                    $('#users-table').html('');
                    var new_page = --current_search_page;
                    if (new_page === 0) {
                        load_data(1);
                        current_search_page = 1;
                        $('#prev-page').attr("style", "display:none;");
                    } else {
                        load_data(new_page);
                        current_search_page = new_page;
                    }
                });

            }
        })
    });


})