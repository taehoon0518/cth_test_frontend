<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';  // useRouter를 사용해 페이지 이동

const boards = ref([]);
const router = useRouter();  // useRouter 훅을 사용하여 페이지 이동을 처리

// 게시물 목록을 가져오는 함수
const fetchBoards = async () => {
    try {
        const response = await axios.get('http://localhost:8080/board/list'); 
        boards.value = response.data;
    } catch (error) {
        console.error('게시물 목록을 가져오는 데 실패했습니다:', error);
    }
};

// 게시글 작성 페이지로 이동하는 함수
const goToRegisterPage = () => {
    router.push('/board/register');
};

onMounted(() => {
    fetchBoards();
});
</script>

<template>
    <div>
        <h1>게시물 목록</h1>

        <!-- 게시글 작성 버튼 -->
        <button @click="goToRegisterPage">게시글 작성하기</button>

        <!-- 게시물 목록 테이블 -->
        <table border="1">
            <thead>
                <tr>
                    <th>번호</th> <!-- 번호 열 추가 -->
                    <th>제목</th>
                    <th>작성자</th>
                    <th>댓글 수</th>
                    <th>상세보기</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="board in boards" :key="board.idx">
                    <td>{{ board.idx }}</td> <!-- board.idx를 번호로 표시 -->
                    <td>{{ board.title }}</td>
                    <td>{{ board.writer }}</td>
                    <td>{{ board.commentCount }}</td>
                    <td>
                        <router-link :to="'/board/' + board.idx">상세보기</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    padding: 16px;  /* 칸 크기 늘리기 */
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

td {
    border-bottom: 1px solid #ddd;
}

button {
    margin-bottom: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
