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
        this.setupBoardEventListener();
        this.setupResetButtonListener();
        this.setupModalEventListeners();
    }
    
    // 设置棋盘点击事件监听器
    setupBoardEventListener() {
        const boardElement = document.getElementById('game-board');
        
        boardElement.addEventListener('click', (event) => {
            if (this.gameOver) return;
            
            const cell = event.target;
            if (cell.classList.contains('cell')) {
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);
                this.makeMove(row, col);
            }
        });
    }
    
    // 设置重新开始按钮事件监听器
    setupResetButtonListener() {
        const resetButton = document.getElementById('reset-btn');
        
        resetButton.addEventListener('click', () => {
            this.resetGame();
        });
    }
    
    // 设置模态框事件监听器
    setupModalEventListeners() {
        const playAgainButton = document.getElementById('play-again-btn');
        const closeModalButton = document.getElementById('close-modal-btn');
        
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
        const player = this.board[row][col]; // 当前落子的玩家
        const directions = [
            [0, 1],  // 水平方向 →
            [1, 0],  // 垂直方向 ↓
            [1, 1],  // 对角线方向 ↘
            [1, -1]  // 对角线方向 ↙
        ];
        
        // 检查所有四个方向
        for (const [dx, dy] of directions) {
            let count = 1; // 当前位置已经有一个棋子
            
            // 正向检查：从当前位置向一个方向检查最多4个位置
            for (let i = 1; i <= 4; i++) {
                const newRow = row + dx * i;
                const newCol = col + dy * i;
                
                // 如果位置有效且棋子相同，增加计数
                if (this.isValidPosition(newRow, newCol) && 
                    this.board[newRow][newCol] === player) {
                    count++;
                } else {
                    break; // 遇到不同棋子或边界，停止检查
                }
            }
            
            // 反向检查：从当前位置向相反方向检查最多4个位置
            for (let i = 1; i <= 4; i++) {
                const newRow = row - dx * i;
                const newCol = col - dy * i;
                
                // 如果位置有效且棋子相同，增加计数
                if (this.isValidPosition(newRow, newCol) && 
                    this.board[newRow][newCol] === player) {
                    count++;
                } else {
                    break; // 遇到不同棋子或边界，停止检查
                }
            }
            
            // 精确匹配5个连续棋子才判定获胜（修复了原来>=5的错误）
            if (count === 5) {
                return true;
            }
        }
        
        return false; // 所有方向都没有5连珠
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
        
        // 完全禁用棋盘交互
        this.disableBoard();
    }
    
    // 隐藏获胜弹窗
    hideWinnerModal() {
        const modal = document.getElementById('winner-modal');
        modal.style.display = 'none';
    }
    
    // 禁用棋盘交互
    disableBoard() {
        const boardElement = document.getElementById('game-board');
        boardElement.style.pointerEvents = 'none'; // 禁用鼠标事件
        boardElement.style.opacity = '0.7'; // 降低透明度表示禁用状态
    }
    
    // 启用棋盘交互
    enableBoard() {
        const boardElement = document.getElementById('game-board');
        boardElement.style.pointerEvents = 'auto'; // 启用鼠标事件
        boardElement.style.opacity = '1'; // 恢复完全可见
    }
    
    // 重置游戏
    resetGame() {
        this.currentPlayer = BLACK;
        this.gameOver = false;
        this.winner = null;
        this.hideWinnerModal();
        this.enableBoard(); // 重新启用棋盘交互
        this.initializeGame();
    }
}

// 游戏初始化
document.addEventListener('DOMContentLoaded', () => {
    new GomokuGame();
});