<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';  // 페이지 이동을 위해 useRouter 사용

// 제목, 내용, 작성자를 저장할 변수
const title = ref('');
const content = ref('');
const writer = ref('');

// useRouter 훅을 사용하여 페이지 이동을 처리
const router = useRouter();

// 게시물 등록 함수
const registerBoard = async () => {
  try {
    // POST 요청으로 데이터를 전송
    const response = await axios.post('http://localhost:8080/board/register', {
      title: title.value,
      content: content.value,
      writer: writer.value
    });
    // 성공적으로 등록되면 게시물 목록 페이지로 이동
    router.push('/board/list');
  } catch (error) {
    console.error('게시물 등록에 실패했습니다:', error);
  }
};

// 목록 페이지로 돌아가는 함수
const goBackToList = () => {
  router.push('/board/list');
};
</script>

<template>
  <div>
    <h1>게시물 작성</h1>

    <!-- 게시물 작성 폼 -->
    <form @submit.prevent="registerBoard">
      <div>
        <label for="title">제목</label>
        <input type="text" id="title" v-model="title" placeholder="제목을 입력하세요" required />
      </div>
      
      <div>
        <label for="content">내용</label>
        <textarea id="content" v-model="content" placeholder="내용을 입력하세요" required></textarea>
      </div>
      
      <div>
        <label for="writer">작성자</label>
        <input type="text" id="writer" v-model="writer" placeholder="작성자를 입력하세요" required />
      </div>

      <!-- 작성 완료 버튼 -->
      <button type="submit">작성 완료</button>
    </form>

    <!-- 뒤로 가기 버튼 -->
    <button @click="goBackToList">목록으로 돌아가기</button>
  </div>
</template>

<style scoped>
form {
  width: 300px;
  margin: 0 auto;
}

div {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
}

button:hover {
  background-color: #0056b3;
}

button:nth-child(2) {
  background-color: #28a745;
}

button:nth-child(2):hover {
  background-color: #218838;
}
</style>
