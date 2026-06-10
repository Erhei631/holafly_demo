const AUTH_KEY = 'holafly_auth';

function setPhoneSession(payload) {
  wx.setStorageSync(AUTH_KEY, {
    ...payload,
    loggedIn: true,
    ts: Date.now(),
  });
}

function getAuthSession() {
  return wx.getStorageSync(AUTH_KEY) || null;
}

function isLoggedIn() {
  const session = getAuthSession();
  return !!(session && session.loggedIn);
}

function clearAuthSession() {
  wx.removeStorageSync(AUTH_KEY);
}

function maskPhone(phone) {
  if (!phone || phone.length < 11) return phone;
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

module.exports = {
  setPhoneSession,
  getAuthSession,
  isLoggedIn,
  clearAuthSession,
  maskPhone,
};
