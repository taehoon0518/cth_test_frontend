<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';  // useRoute로 URL 파라미터 가져오기

// 게시물 데이터와 댓글 데이터를 저장할 변수
const board = ref(null);
const comments = ref([]);
const newComment = ref('');
const writer = ref(''); // 작성자 입력을 위한 변수

// 현재 게시물의 ID
const route = useRoute();
const boardId = route.params.idx;
const router = useRouter();

// 게시물과 댓글 데이터를 가져오는 함수
const fetchBoardDetails = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/board/${boardId}`);
    board.value = response.data;  // 게시물 데이터
    comments.value = response.data.comments;  // 댓글 데이터
  } catch (error) {
    console.error('게시물 상세 조회에 실패했습니다:', error);
  }
};

// 댓글 작성 함수
const addComment = async () => {
  if (!newComment.value || !writer.value) {
    alert('댓글 내용과 작성자를 모두 입력해주세요.');
    return;
  }

  try {
    // 댓글 등록 API 호출
    await axios.post(`http://localhost:8080/comment/${boardId}/register`, {
      content: newComment.value,
      writer: writer.value
    });

    // 댓글을 추가한 후, 최신 댓글 목록을 서버에서 다시 가져옴
    await fetchBoardDetails();  // 댓글이 추가된 후 게시물과 댓글 목록을 새로고침
    newComment.value = '';  // 댓글 작성 후 입력 필드를 비움
    writer.value = '';  // 작성자 입력 필드 비움
  } catch (error) {
    console.error('댓글 작성에 실패했습니다:', error);
  }
};

onMounted(() => {
  fetchBoardDetails();  // 페이지가 로드될 때 게시물 정보 가져오기
});
</script>

<template>
  <div class="container">
    <!-- 게시물 상세 정보 -->
    <div class="board-detail">
      <h1>{{ board?.title }}</h1>
      <p class="board-author">작성자: {{ board?.writer }}</p>
      <div class="board-content">{{ board?.content }}</div> <!-- 게시물 내용 추가 -->
    </div>

    <!-- 댓글 목록 -->
    <div class="comments-section">
      <h3>댓글</h3>
      <ul class="comments-list">
        <li v-for="(comment, index) in comments" :key="index" class="comment-item">
          <strong>{{ comment.writer }}</strong>: {{ comment.content }}
        </li>
      </ul>
    </div>

    <!-- 댓글 작성 폼 -->
    <div class="comment-form">
      <input v-model="writer" placeholder="작성자" class="comment-input" />
      <textarea v-model="newComment" placeholder="댓글을 작성하세요" rows="4" class="comment-textarea"></textarea>
      <button @click="addComment" class="comment-submit">댓글 작성</button>
    </div>

    <!-- 뒤로 가기 버튼 -->
    <button @click="router.push('/board/list')" class="back-btn">목록으로 돌아가기</button>
  </div>
</template>

<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.board-detail {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

h1 {
  font-size: 28px;
  font-weight: bold;
  color: #333;
}

.board-author {
  font-size: 16px;
  color: #777;
  margin-top: 10px;
}

.board-content {
  font-size: 18px;
  color: #555;
  margin-top: 20px;
  white-space: pre-wrap; /* 줄바꿈 유지 */
}

.comments-section {
  margin-top: 30px;
}

.comments-list {
  list-style-type: none;
  padding: 0;
}

.comment-item {
  background-color: #f1f1f1;
  padding: 12px;
  margin: 10px 0;
  border-radius: 6px;
  font-size: 16px;
}

.comment-item strong {
  color: #007bff;
}

.comment-form {
  margin-top: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.comment-input, .comment-textarea {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.comment-submit {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.comment-submit:hover {
  background-color: #0056b3;
}

.back-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-btn:hover {
  background-color: #218838;
}
</style>
