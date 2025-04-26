import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trex-game',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="game-container">
      <canvas #gameCanvas [width]="canvasWidth" height="150"></canvas>
      <div class="game-overlay" *ngIf="!isPlaying">
        <div class="start-message">Press SPACE to start</div>
      </div>
    </div>
  `,
  styles: [`
    .game-container {
      position: relative;
      width: 100%;
      height: 150px;
      margin: 0 auto;
      overflow: hidden;
    }

    canvas {
      width: 100%;
      background: transparent;
    }

    .game-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      padding-top: 10px;
      background: rgba(0, 0, 0, 0.3);
    }

    .start-message {
      color: white;
      font-family: monospace;
      font-size: 18px;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
  `]
})
export class TrexGameComponent implements AfterViewInit {
  @ViewChild('gameCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @Output() gameStarted = new EventEmitter<void>();
  
  private ctx!: CanvasRenderingContext2D;
  private animationId: number = 0;
  canvasWidth: number = window.innerWidth;
  
  constructor() {
    // Update canvas width on window resize
    window.addEventListener('resize', () => {
      this.canvasWidth = window.innerWidth;
      if (this.canvasRef) {
        this.canvasRef.nativeElement.width = this.canvasWidth;
        this.drawInitialScene();
      }
    });
  }

  // Game state
  isPlaying: boolean = false;
  score: number = 0;
  
  // Dino properties
  private dino = {
    x: 50,
    y: 0,
    width: 40,
    height: 40,
    jumping: false,
    velocity: 0,
    gravity: 0.4,
    jumpForce: -10
  };

  // Ground properties
  private ground = {
    y: 130
  };

  // Obstacles array
  private obstacles: Array<{x: number, width: number, height: number}> = [];
  private obstacleSpeed = 3;
  private minObstacleHeight = 30;
  private maxObstacleHeight = 50;
  private minObstacleSpacing = 800;
  private lastObstacleX = this.canvasWidth;

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.dino.y = this.ground.y - this.dino.height;
    this.drawInitialScene();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      event.preventDefault();
      if (!this.isPlaying) {
        this.startGame();
      } else if (!this.dino.jumping) {
        this.jump();
      }
    }
  }

  private startGame() {
    this.isPlaying = true;
    this.score = 0;
    this.obstacles = [];
    this.dino.y = this.ground.y - this.dino.height;
    this.dino.velocity = 0;
    this.dino.jumping = false;
    this.lastObstacleX = this.canvasWidth;
    
    // Start with just one obstacle, positioned further away
    const randomHeight = Math.floor(
      Math.random() * (this.maxObstacleHeight - this.minObstacleHeight) + this.minObstacleHeight
    );
    
    this.obstacles.push({
      x: this.canvasWidth + 200,
      width: 20,
      height: randomHeight
    });
    
    this.gameStarted.emit();
    this.gameLoop();
  }

  private jump() {
    if (!this.dino.jumping) {
      this.dino.jumping = true;
      this.dino.velocity = this.dino.jumpForce;
    }
  }

  private gameLoop() {
    this.update();
    this.draw();
    this.animationId = requestAnimationFrame(() => this.gameLoop());
  }

  private update() {
    if (!this.isPlaying) return;

    // Update dino
    if (this.dino.jumping) {
      this.dino.velocity += this.dino.gravity;
      this.dino.y += this.dino.velocity;

      if (this.dino.y >= this.ground.y - this.dino.height) {
        this.dino.y = this.ground.y - this.dino.height;
        this.dino.jumping = false;
        this.dino.velocity = 0;
      }
    }

    // Generate obstacles with more spacing
    const shouldAddObstacle = this.obstacles.length === 0 || 
      (this.lastObstacleX - this.obstacles[this.obstacles.length - 1].x >= this.minObstacleSpacing);

    if (shouldAddObstacle && Math.random() > 0.3) {
      const randomHeight = Math.floor(
        Math.random() * (this.maxObstacleHeight - this.minObstacleHeight) + this.minObstacleHeight
      );
      
      this.obstacles.push({
        x: this.canvasWidth,
        width: 20,
        height: randomHeight
      });
      
      this.lastObstacleX = this.canvasWidth;
    }

    // Update obstacles
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      this.obstacles[i].x -= this.obstacleSpeed;
      
      // Remove off-screen obstacles
      if (this.obstacles[i].x + this.obstacles[i].width < 0) {
        this.obstacles.splice(i, 1);
        this.score++;
        continue;
      }

      // Collision detection
      if (this.checkCollision(this.obstacles[i])) {
        this.gameOver();
        return;
      }
    }
  }

  private checkCollision(obstacle: {x: number, width: number, height: number}): boolean {
    const dinoRight = this.dino.x + this.dino.width;
    const dinoBottom = this.dino.y + this.dino.height;
    const obstacleRight = obstacle.x + obstacle.width;
    const obstacleTop = this.ground.y - obstacle.height;

    return !(
      dinoRight < obstacle.x || // dino is left of the obstacle
      this.dino.x > obstacleRight || // dino is right of the obstacle
      dinoBottom < obstacleTop || // dino is above the obstacle
      this.dino.y > this.ground.y // dino is below the obstacle
    );
  }

  private gameOver() {
    cancelAnimationFrame(this.animationId);
    this.isPlaying = false;
    this.drawGameOver();
  }

  private draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvasWidth, 150);

    // Draw score with larger font
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`Score: ${this.score}`, this.canvasWidth - 30, 40);

    // Draw ground
    ctx.beginPath();
    ctx.moveTo(0, this.ground.y);
    ctx.lineTo(this.canvasWidth, this.ground.y);
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    // Draw dino
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(this.dino.x, this.dino.y, this.dino.width, this.dino.height);

    // Draw obstacles
    ctx.fillStyle = '#ffffff';
    this.obstacles.forEach(obstacle => {
      ctx.fillRect(
        obstacle.x,
        this.ground.y - obstacle.height,
        obstacle.width,
        obstacle.height
      );
    });
  }

  private drawInitialScene() {
    this.draw();
  }

  private drawGameOver() {
    const ctx = this.ctx;
    
    // Draw semi-transparent overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, this.canvasWidth, 150);
    
    // Draw game over text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', this.canvasWidth / 2, 60);
    
    ctx.font = 'bold 20px monospace';
    ctx.fillText('Press SPACE to restart', this.canvasWidth / 2, 90);
    
    // Draw final score with larger font
    ctx.font = 'bold 24px monospace';
    ctx.fillText(`Final Score: ${this.score}`, this.canvasWidth / 2, 120);
  }
} 