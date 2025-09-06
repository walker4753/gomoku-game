// 五子棋游戏主逻辑文件

// 游戏状态常量
const EMPTY = 0; // 空单元格
const BLACK = 1; // 黑子
const WHITE = 2; // 白子

// 游戏类
class GomokuGame {
    constructor() {
        this.boardSize = 15; // 棋盘大小 15x15
        this.board = []; // 棋盘状态数组
        this.currentPlayer = BLACK; // 当前玩家（黑子先手）
        this.gameOver = false; // 游戏是否结束
        this.winner = null; // 获胜者
        
        this.initializeGame();
        this.setupEventListeners();
    }
    
    // 初始化游戏
    initializeGame() {
        // 创建空棋盘
        this.board = Array(this.boardSize).fill().map(() => 
            Array(this.boardSize).fill(EMPTY)
        );
        
        // 渲染棋盘
        this.renderBoard();
        
        // 更新游戏状态显示
        this.updateGameStatus();
    }
    
    // 渲染棋盘
    renderBoard() {
        const boardElement = document.getElementById('game-board');
        boardElement.innerHTML = '';
        
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                // 添加棋子样式
                if (this.board[row][col] === BLACK) {
                    cell.classList.add('black');
                } else if (this.board[row][col] === WHITE) {
                    cell.classList.add('white');
                }
                
                boardElement.appendChild(cell);
            }
        }
    }
    
    // 设置事件监听器
    setupEventListeners() {
        const boardElement = document.getElementById('game-board');
        const resetButton = document.getElementById('reset-btn');
        const playAgainButton = document.getElementById('play-again-btn');
        const closeModalButton = document.getElementById('close-modal-btn');
        
        // 棋盘点击事件
        boardElement.addEventListener('click', (event) => {
            if (this.gameOver) return;
            
            const cell = event.target;
            if (cell.classList.contains('cell')) {
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);
                this.makeMove(row, col);
            }
        });
        
        // 重新开始按钮事件
        resetButton.addEventListener('click', () => {
            this.resetGame();
        });
        
        // 再来一局按钮事件
        playAgainButton.addEventListener('click', () => {
            this.hideWinnerModal();
            this.resetGame();
        });
        
        // 关闭弹窗按钮事件
        closeModalButton.addEventListener('click', () => {
            this.hideWinnerModal();
        });
    }
    
    // 落子
    makeMove(row, col) {
        // 检查位置是否有效且为空
        if (this.isValidMove(row, col)) {
            // 放置棋子
            this.board[row][col] = this.currentPlayer;
            
            // 检查是否获胜
            if (this.checkWin(row, col)) {
                this.gameOver = true;
                this.winner = this.currentPlayer;
                this.showWinner();
            } else {
                // 切换玩家
                this.currentPlayer = this.currentPlayer === BLACK ? WHITE : BLACK;
            }
            
            // 更新界面
            this.renderBoard();
            this.updateGameStatus();
        }
    }
    
    // 检查移动是否有效
    isValidMove(row, col) {
        return row >= 0 && row < this.boardSize && 
               col >= 0 && col < this.boardSize && 
               this.board[row][col] === EMPTY;
    }
    
    // 检查是否获胜
    checkWin(row, col) {
        const player = this.board[row][col];
        const directions = [
            [0, 1],  // 水平
            [1, 0],  // 垂直
            [1, 1],  // 对角线 ↘
            [1, -1]  // 对角线 ↙
        ];
        
        for (const [dx, dy] of directions) {
            let count = 1; // 当前位置已经有一个棋子
            
            // 正向检查
            for (let i = 1; i <= 4; i++) {
                const newRow = row + dx * i;
                const newCol = col + dy * i;
                
                if (this.isValidPosition(newRow, newCol) && 
                    this.board[newRow][newCol] === player) {
                    count++;
                } else {
                    break;
                }
            }
            
            // 反向检查
            for (let i = 1; i <= 4; i++) {
                const newRow = row - dx * i;
                const newCol = col - dy * i;
                
                if (this.isValidPosition(newRow, newCol) && 
                    this.board[newRow][newCol] === player) {
                    count++;
                } else {
                    break;
                }
            }
            
            // 如果连续5个相同棋子，获胜
            if (count >= 5) {
                return true;
            }
        }
        
        return false;
    }
    
    // 检查位置是否有效
    isValidPosition(row, col) {
        return row >= 0 && row < this.boardSize && col >= 0 && col < this.boardSize;
    }
    
    // 更新游戏状态显示
    updateGameStatus() {
        const statusElement = document.getElementById('current-player');
        statusElement.textContent = this.currentPlayer === BLACK ? '黑子' : '白子';
        
        // 隐藏获胜消息
        const winnerMessage = document.getElementById('winner-message');
        winnerMessage.style.display = 'none';
    }
    
    // 显示获胜者
    showWinner() {
        const winnerMessage = document.getElementById('winner-message');
        winnerMessage.textContent = `游戏结束！${this.winner === BLACK ? '黑子' : '白子'}获胜！`;
        winnerMessage.style.display = 'block';
        
        // 显示获胜弹窗
        this.showWinnerModal();
    }
    
    // 显示获胜弹窗
    showWinnerModal() {
        const modal = document.getElementById('winner-modal');
        const modalMessage = document.getElementById('modal-message');
        
        modalMessage.textContent = `${this.winner === BLACK ? '黑子' : '白子'}获得了胜利！`;
        modal.style.display = 'flex';
    }
    
    // 隐藏获胜弹窗
    hideWinnerModal() {
        const modal = document.getElementById('winner-modal');
        modal.style.display = 'none';
    }
    
    // 重置游戏
    resetGame() {
        this.currentPlayer = BLACK;
        this.gameOver = false;
        this.winner = null;
        this.hideWinnerModal();
        this.initializeGame();
    }
}

// 游戏初始化
document.addEventListener('DOMContentLoaded', () => {
    new GomokuGame();
});