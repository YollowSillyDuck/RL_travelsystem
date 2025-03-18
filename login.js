const loginForm = document.querySelector('form');
let loginStatus = false; // 改用 let

function isLoginSuccess(username, password) {
  return username === "admin" && password === "123456"|| username === "Luna999" && password === "LBW_IS_FW";
}

function LoginVerification(e) {
  e.preventDefault();
  
  // 正确获取输入值
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  
  // 清理输入
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // 验证逻辑
  loginStatus = isLoginSuccess(username, password);
  
  if (!loginStatus) {
    console.log("登录失败，用户不存在");
    alert('用户名或密码错误');
    return;
  }
  
  console.log("登录成功");
  window.location.href = `index.html?username=${encodeURIComponent(username)}`; 
}

// 正确绑定表单提交事件
loginForm.addEventListener('submit', LoginVerification);