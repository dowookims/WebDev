const exchangeRate = 0.91;

// 안 내보냄
function roundTwoDecimals(amount) {
  return Math.round(amount * 100) / 100;
}

// 내보내기
export default {
  canadianToUs(canadian) {
    return roundTwoDecimals(canadian * exchangeRate);
  },

  usToCanadian: function(us) {
    return roundTwoDecimals(us / exchangeRate);
  }
};