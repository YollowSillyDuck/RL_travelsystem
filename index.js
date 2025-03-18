// 解析 URL 参数
const urlParams = new URLSearchParams(window.location.search);
const username = decodeURIComponent(urlParams.get('username'));

// 显示用户名
console.log(`欢迎回来，${username}!`);

// 安全验证（防止直接访问）
if (!username) {
  window.location.href = './login.html';
}
// 在index.js中添加以下代码
document.addEventListener('DOMContentLoaded', function() {
    // 获取登录状态
    const urlParams = new URLSearchParams(window.location.search);
    const storedUser = sessionStorage.getItem('authUser');
    const username = storedUser || urlParams.get('username');

    // 状态切换函数
    const toggleLoginState = (isLoggedIn) => {
        document.body.classList.toggle('logged-out', !isLoggedIn);
        document.body.classList.toggle('logged-in', isLoggedIn);
        document.getElementById('loggedInUser').classList.toggle('d-none', !isLoggedIn);
        document.getElementById('loggedOutUser').classList.toggle('d-none', isLoggedIn);
    };

    if (username) {
        // 解码并显示用户名
        const decodedUsername = decodeURIComponent(username);
        document.querySelectorAll('#usernameDisplay, #dropdownUsername').forEach(el => {
            el.textContent = decodedUsername;
        });
        
        // 保存登录状态
        if (!storedUser) {
            sessionStorage.setItem('authUser', decodedUsername);
        }
        
        // 切换为登录状态
        toggleLoginState(true);
    }

    // 退出登录功能
    document.getElementById('logoutBtn')?.addEventListener('click', function(e) {
        e.preventDefault();
        sessionStorage.removeItem('authUser');
        toggleLoginState(false);
        window.location.href = 'login.html';
    });

    // 防止刷新丢失状态
    window.addEventListener('pageshow', function(event) {
        if (event.persisted && !sessionStorage.getItem('authUser')) {
            window.location.reload();
        }
    });
});