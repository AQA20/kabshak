window.currnetNavClicked = 1
GetUsersList();

function GetUsersList() {
    let allParams = $('#search-filters-items :input').serialize();
    allParams = JSON.parse('{"' + decodeURI(allParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');

    var fdata = new FormData();
    fdata.append('txt', (allParams.searchtxt ? decodeURIComponent(allParams.searchtxt) : "-1").toString());
    fdata.append('active', (allParams.active ? decodeURIComponent(allParams.active) : "-1").toString());
    fdata.append('inactive', (allParams.inactive ? decodeURIComponent(allParams.inactive) : "-1").toString());
    fdata.append('admin', (allParams.admin ? decodeURIComponent(allParams.admin) : "-1").toString());
    fdata.append('start', (allParams.start ? decodeURIComponent(allParams.start) : "1").toString());
    fdata.append('end', (allParams.end ? decodeURIComponent(allParams.end) : "20").toString());

    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/users.asmx/get_users_list',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillUsersInfo(data, allParams.end, allParams.start);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function FillUsersInfo(data, end, start) {
    if (data.length > 0) {
        let index = 0;
        let items = [];
        for (index; index < data.length; index++) {
            let item = data[index];
            let classRandom = (Math.random() + 1).toString(36).substring(7);
            items.push(` <article class="post post-list post-listing  pt-2 pb-2 overlay-zoom" style="border-bottom: solid 1px #eee;">
                            <figure class="post-media br-sm">
                                <a href="#" onclick="voidclick(); return false">
                                    <img src="/assets/images/user.png" width="930" height="500" alt="blog">
                                </a>
                            </figure>
                            <div class="post-details">
                                <div class="post-cats text-primary">
                                    <a href="#" onclick="voidclick(); return false">${item.Email}</a>
                                </div>
                                <h4 class="post-title">
                                    <a href="#" onclick="voidclick(); return false">Name: ${item.FirstName + ' ' + (item.LastName == null ? '' : item.LastName)}</a>
                                </h4>
                                <div class="post-content">
                                    <p class="active${classRandom}" style="border: solid 1px #dddddd;padding: 5px;border-radius: 3px;">
                                        ${item.IsActive ? 'Is Active' : 'In Active'}
                                    </p>
                                    <p class="admin${classRandom}" style="border: solid 1px #dddddd;padding: 5px;border-radius: 3px;">
                                        ${item.IsAdmin ? 'Is Admin' : 'Is not Admin'}
                                    </p>
                                    <p style="border: solid 1px #dddddd;padding: 5px;border-radius: 3px;">
                                        ${ValidateEmail(item.Email) ? (item.Email.trim().toLowerCase().includes('gmail') ? 'Registered by Gmail' : 'Registered by Email') : 'Registered by Facebook'}
                                    </p>
                                </div>
                                <div class="post-meta">
                                    <a href="#" onclick="voidclick(); return false" class="post-author">Join us</a>
                                    - <a href="#" onclick="voidclick(); return false" class="post-date">${item.CreatedDate}</a>
                                </div>
                                <div style="margin-top: 15px;">
                                    <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4" onclick="ChangeActivationStatus('${item.Token}',${item.IsActive},'active${classRandom}',this);">${item.IsActive ? 'Dectivate' : 'Activate'}</button>
                                    <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4" onclick="MakeAsAdmin('${item.Token}',${item.IsAdmin},'admin${classRandom}',this);">${item.IsAdmin ? 'Remove Admin Privilege' : 'Make as Admin'}</button>
                                    <div class="alert alert-icon alert-success alert-bg alert-inline show-code-action d-none alert${classRandom}">
                                        <h4 class="alert-title">
                                        <i class="fas fa-check"></i>Well done!</h4> <p style="margin:unset;">alert message.</p>
                                    </div>
                                </div>
                            </div>
                        </article>`);
        }
        $('.main-content').html(items);
        BindPaginationBar(data[0].Records, end, start)
    }
    else {
        window.currnetNavClicked = 1
        $('[name="start"]').val(1);
        $('[name="end"]').val(20);
        $('.main-content').html('<div style="font-weight: 500;color: #05D7A0;padding: 5px;font-size: 20px;padding-bottom: 350px;"><span class="w-icon-search-plus" style="padding-right: 5px;padding-left: 5px;"></span>No result found!</div>');
        $('.pagination').html(' ');
        $('.showing-info').html(' ');
        $('body , html').animate({
            scrollTop: $('.page-wrapper').offset().top
        }, 300)
    }

    setTimeout(
        function () {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }, 1000);
}

function ChangeActivationStatus(token, active, tag, btn) {
    if (active) {
        btn.textContent = "Activate";
        btn.setAttribute("onclick", "ChangeActivationStatus('" + token + "',false,'" + tag + "',this);");
        $('.' + tag).html('In Active')
    }
    else {
        btn.textContent = "Deactivate";
        btn.setAttribute("onclick", "ChangeActivationStatus('" + token + "',true,'" + tag + "',this);");
        $('.' + tag).html('Is Active')
    }

    var fdata = new FormData();
    fdata.append('token', token.trim());
    fdata.append('user_token', userId.trim());
    fdata.append('status', (!active).toString());
    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/users.asmx/chnage_activation_status',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            $('.' + tag.replace('active', 'alert')).removeClass('d-none');
            $('.' + tag.replace('active', 'alert')).addClass('d-flex');
            $('.alert' + tag.replace('active', '') + ' p').html('The account has been ' + (active ? 'deactivated.' : 'activated.'));
        }
    });
}

function MakeAsAdmin(token, admin, tag, btn) {
    if (admin) {
        btn.textContent = "Make as Admin";
        btn.setAttribute("onclick", "MakeAsAdmin('" + token + "',false,'" + tag + "',this);");
        $('.' + tag).html('Is not Admin')
    }
    else {
        btn.textContent = "Remove Admin Privilege";
        btn.setAttribute("onclick", "MakeAsAdmin('" + token + "',true,'" + tag + "',this);");
        $('.' + tag).html('Is Admin')
    }

    var fdata = new FormData();
    fdata.append('token', token.trim());
    fdata.append('user_token', userId.trim());
    fdata.append('status', (!admin).toString());
    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/users.asmx/chnage_admin_status',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            $('.' + tag.replace('admin', 'alert')).removeClass('d-none');
            $('.' + tag.replace('admin', 'alert')).addClass('d-flex');
            $('.alert' + tag.replace('admin', '') + ' p').html('The admin privilege has been ' + (admin ? 'removed.' : 'added.'));
        }
    });
}

function SearchUserByText() {
    window.currnetNavClicked = 1
    $('[name="searchtxt"]').val($('#userTextSearch').val());
    $('[name="start"]').val(1);
    $('[name="end"]').val(20);
    GetUsersList();
    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

$(document).on('click', '.active-checkbox input', (e) => {
    if (e.target.checked) {
        $('[name="active"]').val('1');
    } else {
        $('[name="active"]').val('-1');
    }
    $('[name="start"]').val(1);
    $('[name="end"]').val(20);
    GetUsersList();
    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
})

$(document).on('click', '.inactive-checkbox input', (e) => {
    if (e.target.checked) {
        $('[name="inactive"]').val('1');
    } else {
        $('[name="inactive"]').val('-1');
    }
    $('[name="start"]').val(1);
    $('[name="end"]').val(20);
    GetUsersList();
    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
})

$(document).on('click', '.admin-checkbox input', (e) => {
    if (e.target.checked) {
        $('[name="admin"]').val('1');
    } else {
        $('[name="admin"]').val('-1');
    }
    $('[name="start"]').val(1);
    $('[name="end"]').val(20);
    GetUsersList();
    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
})

function BindPaginationBar(records, end, start) {
    if (start > 120) {
        window.currnetNavClicked = Math.ceil(start / 20);
        window.currnetNavClicked = Math.ceil(window.currnetNavClicked / 6);
    }
    else {
        window.currnetNavClicked = 1;
    }

    let clickedValue = window.currnetNavClicked;
    let endValue = end;

    let numberOfNav = parseInt(records)
    let counter = 6 * clickedValue;

    let navindex = (clickedValue - 1) * (counter / clickedValue);
    let elementsCounter = 1;
    let items = [];
    let navItems = [];
    for (navindex; navindex <= counter; navindex++) {
        let setStarValue = navindex * ((20 * clickedValue) / clickedValue) + 1;
        let setEndValue = (setStarValue - 1) + ((20 * clickedValue) / clickedValue);
        if (navindex < counter && navindex < numberOfNav / 20) {
            navItems.push(`
                            <li class="page-item ${endValue == setEndValue ? 'active' : ''}" id="${navindex}">
                                <a class="page-link " href="#" onclick="getNext(${setStarValue},${setEndValue},'a')" >${navindex + ((counter / 6) / clickedValue)}</a>
                            </li>
                        `)
            elementsCounter++
        }

        if (navindex == counter && navindex < numberOfNav / 20) {
            navItems.push(`
                            <li class="next">
                                <a  href="#" onclick="getNext(${setStarValue},${setEndValue},true)" aria-label="Next">
                                    ${IsArabic ? 'التالي' : 'Next'}<i class="${IsArabic ? 'w-icon-long-arrow-left' : 'w-icon-long-arrow-right'}"></i>
                                </a>
                            </li>
                        `)
        }

        if (navindex + 1 > counter && clickedValue != 1 && numberOfNav / 20 >= 2) {
            navItems.unshift(`
                <li class="prev">
                    <a href="#" onclick="getNext(${start - 20},${end - 20},false)" aria-label="previous">
                        <i class="${IsArabic ? 'w-icon-long-arrow-right' : 'w-icon-long-arrow-left'}"></i>${IsArabic ? 'السابق' : 'Prev'}
                    </a>
                </li>
                `)
        }
    }

    $('.pagination').html(navItems);
    $('.showing-info').html('Showing<span>' + start + '-' + ((records > end) ? end : records) + ' of ' + records + '</span>Accounts');
}

let getNext = (start, end, check) => {
    if ($('[name="end"]').val() != end) {
        $('[name="start"]').val(start);
        $('[name="end"]').val(end);
        if (check == true) {
            window.currnetNavClicked++
        }
        if (check == false) {
            window.currnetNavClicked--
        }
        GetUsersList();
        $('body , html').animate({
            scrollTop: $('.page-wrapper').offset().top
        }, 300)
    }
}

function CleanUserPageFilters() {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');
    window.location = "/admin/users";
}