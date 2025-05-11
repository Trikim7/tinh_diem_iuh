function changeSubjectType() {
  const subjectType = document.getElementById("subject-type").value
  const theoryOnly = document.getElementById("theory-only")
  const theoryPractice = document.getElementById("theory-practice")

  if (subjectType === "theory") {
    theoryOnly.style.display = "block"
    theoryPractice.style.display = "none"
  } else {
    theoryOnly.style.display = "none"
    theoryPractice.style.display = "block"
  }

  resetForm()
}

function calculateGrade() {
  const subjectType = document.getElementById("subject-type").value
  let finalScore = 0

  if (subjectType === "theory") {
    // Tính điểm cho môn chỉ có lý thuyết
    const thuongKyScores = []
    for (let i = 1; i <= 5; i++) {
      const score = Number.parseFloat(document.getElementById(`thuong-ky-${i}`).value) || 0
      if (score > 0) thuongKyScores.push(score)
    }

    // Tính điểm trung bình thường xuyên (lấy ít nhất 1 cột điểm cao nhất)
    const thuongKy = calculateAverageScore(thuongKyScores)

    const giuaKy = Number.parseFloat(document.getElementById("giua-ky").value) || 0
    const cuoiKy = Number.parseFloat(document.getElementById("cuoi-ky").value) || 0

    finalScore = (thuongKy * 20 + giuaKy * 30 + cuoiKy * 50) / 100
  } else {
    // Tính điểm cho môn có lý thuyết + thực hành
    const theoryCredit = Number.parseFloat(document.getElementById("theory-credit").value) || 0
    const practiceCredit = Number.parseFloat(document.getElementById("practice-credit").value) || 0
    const totalCredit = Number.parseFloat(document.getElementById("total-credit").value) || 0

    // Tính điểm lý thuyết
    const theoryThuongKyScores = []
    for (let i = 1; i <= 5; i++) {
      const score = Number.parseFloat(document.getElementById(`theory-thuong-ky-${i}`).value) || 0
      if (score > 0) theoryThuongKyScores.push(score)
    }

    // Tính điểm trung bình thường xuyên (lấy ít nhất 1 cột điểm cao nhất)
    const theoryThuongKy = calculateAverageScore(theoryThuongKyScores)

    const theoryGiuaKy = Number.parseFloat(document.getElementById("theory-giua-ky").value) || 0
    const theoryCuoiKy = Number.parseFloat(document.getElementById("theory-cuoi-ky").value) || 0

    const theoryFinalScore = (theoryThuongKy * 20 + theoryGiuaKy * 30 + theoryCuoiKy * 50) / 100

    // Tính điểm thực hành
    const practiceScores = []
    for (let i = 1; i <= 5; i++) {
      const score = Number.parseFloat(document.getElementById(`practice-score-${i}`).value) || 0
      if (score > 0) practiceScores.push(score)
    }

    // Tính điểm trung bình thực hành (lấy ít nhất 1 cột điểm cao nhất)
    const practiceScore = calculateAverageScore(practiceScores)

    // Tính điểm tổng kết
    finalScore = (theoryFinalScore * theoryCredit + practiceScore * practiceCredit) / totalCredit
  }

  // Làm tròn đến 1 chữ số thập phân
  finalScore = Math.round(finalScore * 10) / 10

  // Quy đổi sang thang điểm chữ và thang điểm 4
  const { letterGrade, scale4, classification, passFail } = convertGrade(finalScore)

  // Hiển thị kết quả
  document.getElementById("final-score").textContent = finalScore.toFixed(1)
  document.getElementById("letter-grade").textContent = letterGrade
  document.getElementById("scale-4").textContent = scale4
  document.getElementById("classification").textContent = classification
  document.getElementById("pass-fail").textContent = passFail

  // Thêm hiệu ứng màu sắc cho kết quả
  const resultSection = document.getElementById("result")
  if (finalScore >= 5.0) {
    resultSection.style.borderLeft = "4px solid #4caf50"
  } else {
    resultSection.style.borderLeft = "4px solid #f44336"
  }

  // Hiệu ứng hiển thị kết quả
  resultSection.style.animation = "fadeIn 0.5s"
  setTimeout(() => {
    resultSection.style.animation = ""
  }, 500)
}

function calculateAverageScore(scores) {
  if (scores.length === 0) return 0

  // Sắp xếp điểm từ cao đến thấp
  scores.sort((a, b) => b - a)

  // Lấy ít nhất 1 cột điểm cao nhất
  const scoresToUse = scores.slice(0, Math.max(1, scores.length))

  // Tính trung bình
  return scoresToUse.reduce((sum, score) => sum + score, 0) / scoresToUse.length
}

function convertGrade(score) {
  let letterGrade, scale4, classification, passFail

  if (score >= 9.0 && score <= 10) {
    letterGrade = "A+"
    scale4 = "4.0"
    classification = "Xuất sắc"
    passFail = "Đạt"
  } else if (score >= 8.5 && score < 9.0) {
    letterGrade = "A"
    scale4 = "3.7"
    classification = "Giỏi"
    passFail = "Đạt"
  } else if (score >= 8.0 && score < 8.5) {
    letterGrade = "B+"
    scale4 = "3.5"
    classification = "Khá giỏi"
    passFail = "Đạt"
  } else if (score >= 7.0 && score < 8.0) {
    letterGrade = "B"
    scale4 = "3.0"
    classification = "Khá"
    passFail = "Đạt"
  } else if (score >= 6.0 && score < 7.0) {
    letterGrade = "C+"
    scale4 = "2.5"
    classification = "Trung bình khá"
    passFail = "Đạt"
  } else if (score >= 5.5 && score < 6.0) {
    letterGrade = "C"
    scale4 = "2.0"
    classification = "Trung bình"
    passFail = "Đạt"
  } else if (score >= 5.0 && score < 5.5) {
    letterGrade = "D+"
    scale4 = "1.5"
    classification = "Trung bình yếu"
    passFail = "Đạt"
  } else if (score >= 4.0 && score < 5.0) {
    letterGrade = "D"
    scale4 = "1.0"
    classification = "Yếu"
    passFail = "Đạt"
  } else {
    letterGrade = "F"
    scale4 = "0.0"
    classification = "Kém"
    passFail = "Không đạt"
  }

  return { letterGrade, scale4, classification, passFail }
}

function resetForm() {
  // Reset các trường nhập liệu
  const inputs = document.querySelectorAll('input[type="number"]')
  inputs.forEach((input) => {
    if (input.id === "theory-credit") {
      input.value = "3"
    } else if (input.id === "practice-credit") {
      input.value = "1"
    } else if (input.id === "total-credit") {
      input.value = "4"
    } else {
      input.value = ""
    }
  })

  // Reset kết quả
  document.getElementById("final-score").textContent = "-"
  document.getElementById("letter-grade").textContent = "-"
  document.getElementById("scale-4").textContent = "-"
  document.getElementById("classification").textContent = "-"
  document.getElementById("pass-fail").textContent = "-"

  // Reset màu sắc
  document.getElementById("result").style.borderLeft = "4px solid var(--secondary-color)"
}

// Thêm hiệu ứng CSS
document.head.insertAdjacentHTML(
  "beforeend",
  `
<style>
@keyframes fadeIn {
    from { opacity: 0.5; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
`,
)

// Khởi tạo trang
window.onload = () => {
  // Đặt giá trị mặc định cho các trường số tín chỉ
  document.getElementById("theory-credit").value = "3"
  document.getElementById("practice-credit").value = "1"
  document.getElementById("total-credit").value = "4"
}
