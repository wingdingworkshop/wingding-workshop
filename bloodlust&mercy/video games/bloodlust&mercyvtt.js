class RightPanelManager {
    constructor() {
        this.initializeWidgetSwitcher();
    }

    initializeWidgetSwitcher() {
        const buttons = document.querySelectorAll('.widget-button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and panels
                buttons.forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.widget-panel').forEach(panel => 
                    panel.classList.remove('active')
                );

                // Add active class to clicked button and corresponding panel
                button.classList.add('active');
                const widgetName = button.dataset.widget;
                document.getElementById(`${widgetName}-panel`).classList.add('active');
            });
        });
    }
}


class ChatSystem {
    constructor() {
        this.messages = [];
        this.chatInput = document.querySelector('.chat-input');
        this.chatMessages = document.querySelector('.chat-messages');
        this.initializeChat();
    }

    initializeChat() {
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && this.chatInput.value.trim()) {
                this.sendMessage(this.chatInput.value);
                this.chatInput.value = '';
            }
        });
    }

    sendMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.textContent = message;
        this.chatMessages.appendChild(messageElement);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
      
        // Here you would add websocket/network code to broadcast the message
    }
}

  class Tile {
      constructor(data = {}) {
          this.image = data.image || 'textures/stone.jpg';
          this.position = data.position || { x: 0, y: 0, z: 0 };
          this.height = data.height || 0;
          this.wall = data.wall || {
              north: false,
              south: false,
              east: false,
              west: false
          };
          this.slope = data.slope || {
              north: 0, south: 0, east: 0, west: 0,
              northeast: 0, northwest: 0, southeast: 0, southwest: 0,
              type: 'none',
              angle: 0
          };
          this.temperature = data.temperature || 20;
          this.airContent = data.airContent || {
              oxygen: 21,
              nitrogen: 78,
              other: 1
          };
          this.eventTriggers = data.eventTriggers || [];
      }

      createDOMElement() {
          const tile = document.createElement('div');
          tile.className = 'tile';
          tile.dataset.x = this.position.x;
          tile.dataset.y = this.position.y;
          tile.dataset.height = this.height;
          tile.dataset.slope = JSON.stringify(this.slope);
        
          tile.style.backgroundImage = `url(${this.image})`;
          tile.style.backgroundSize = 'cover';
          tile.style.backgroundPosition = 'center';
        
          Object.entries(this.wall).forEach(([direction, hasWall]) => {
              if (hasWall) tile.classList.add(`wall-${direction}`);
          });
        
          return tile;
      }
}  class GridManager {
      constructor() {
          this.tiles = [];
          this.tileSize = 70;
          this.loadMap('testmap.json');
      }

      async loadMap(mapFile) {
          try {
              const response = await fetch(mapFile);
              const mapData = await response.json();
              this.createGrid(mapData);
          } catch (error) {
              console.log("Loading default grid");
              this.createDefaultGrid();
          }
      }

      resetGrid() {
          const gridContainer = document.getElementById('grid');
          gridContainer.innerHTML = '';
          this.tiles = [];
      }

      calculateGridDimensions(mapData) {
          let minX = Infinity;
          let maxX = -Infinity;
          let minY = Infinity;
          let maxY = -Infinity;

          mapData.tiles.forEach(tile => {
              minX = Math.min(minX, tile.position.x);
              maxX = Math.max(maxX, tile.position.x);
              minY = Math.min(minY, tile.position.y);
              maxY = Math.max(maxY, tile.position.y);
          });

          return {
              width: (maxX - minX + 1) * this.tileSize,
              height: (maxY - minY + 1) * this.tileSize,
              offsetX: minX * this.tileSize,
              offsetY: minY * this.tileSize
          };
      }

      createGrid(mapData) {
          this.resetGrid();
          const gridContainer = document.getElementById('grid');
          const dimensions = this.calculateGridDimensions(mapData);

          gridContainer.style.width = `${dimensions.width}px`;
          gridContainer.style.height = `${dimensions.height}px`;
        
          mapData.tiles.forEach(tileData => {
              const tile = new Tile(tileData);
              const tileElement = tile.createDOMElement();
            
              tileElement.style.position = 'absolute';
              tileElement.style.width = `${this.tileSize}px`;
              tileElement.style.height = `${this.tileSize}px`;
              tileElement.style.left = `${(tileData.position.x * this.tileSize) - dimensions.offsetX}px`;
              tileElement.style.top = `${(tileData.position.y * this.tileSize) - dimensions.offsetY}px`;
            
              gridContainer.appendChild(tileElement);
              this.tiles.push(tile);
          });
      }

      createDefaultGrid() {
          const defaultMap = {
              tiles: Array(121).fill(null).map((_, index) => ({
                  image: 'textures/stone.jpg',
                  position: {
                      x: index % 11,
                      y: Math.floor(index / 11),
                      z: 0
                  },
                  height: 0,
                  wall: false,
                  slope: {
                      north: 0, south: 0, east: 0, west: 0,
                      northeast: 0, northwest: 0, southeast: 0, southwest: 0,
                      type: 'none',
                      angle: 0
                  },
                  temperature: 20,
                  airContent: {
                      oxygen: 21,
                      nitrogen: 78,
                      other: 1
                  },
                  eventTriggers: []
              }))
          };
          this.createGrid(defaultMap);
      }
  }        class Game {
            static MIN_ZOOM = 0.5;
            static MAX_ZOOM = 2.0;
            static MOVE_DIVISOR = 5;

            constructor() {
                this.isDragging = false;
                this.lastMouseX = 0;
                this.lastMouseY = 0;
                this.offsetX = 0;
                this.offsetY = 0;

                this.viewport = document.querySelector('.viewport');
                this.grid = document.getElementById('grid');
                this.menu = document.getElementById('menu');
                this.moveButton = document.getElementById('moveButton');
                this.cancelButton = document.getElementById('cancelButton');
                this.gridSize = 11;
                this.playerPos = {x: 5, y: 5};
                this.walkSpeed = 25;
                this.moveRange = Math.floor(this.walkSpeed / Game.MOVE_DIVISOR);
                this.moveMode = false;
                this.zoomLevel = 1;
                this.floorMaterials = ['wood', 'stone', 'marble', 'dirt', 'grass'];
                this.gameState = 'IDLE';
        
                this.gridManager = new GridManager();
                this.initEvents();
                this.initZoom();
                this.initDrag();
                this.initMapImport();
            }

            initMapImport() {
                const importBtn = document.getElementById('importMapBtn');
                const fileInput = document.getElementById('mapFileInput');

                importBtn.addEventListener('click', () => {
                    fileInput.click();
                });

                fileInput.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();

                    reader.onload = (event) => {
                        const mapData = JSON.parse(event.target.result);
                        this.gridManager.createGrid(mapData);
                    };

                    reader.readAsText(file);
                });
            }
    initDrag() {
        this.viewport.addEventListener('mousedown', (e) => {
            if (e.button === 2) {
                e.preventDefault();
                this.isDragging = true;
                this.lastMouseX = e.clientX;
                this.lastMouseY = e.clientY;
            }
        });

        window.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                const deltaX = e.clientX - this.lastMouseX;
                const deltaY = e.clientY - this.lastMouseY;
                
                this.offsetX += deltaX;
                this.offsetY += deltaY;
                
                this.updateTransform();
                
                this.lastMouseX = e.clientX;
                this.lastMouseY = e.clientY;
            }
        });

        window.addEventListener('mouseup', (e) => {
            if (e.button === 2) {
                this.isDragging = false;
            }
        });

        this.grid.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }

    updateTransform() {
        this.grid.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px) scale(${this.zoomLevel})`;
    }

    initZoom() {
        window.addEventListener('wheel', (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
                const delta = e.deltaY > 0 ? 0.9 : 1.1;
                this.zoomLevel = Math.min(Math.max(Game.MIN_ZOOM, this.zoomLevel * delta), Game.MAX_ZOOM);
                this.updateTransform();
            }
        }, { passive: false });
    }

    initEvents() {
        this.grid.addEventListener('click', (e) => this.handleTileClick(e));
        this.moveButton.addEventListener('click', () => this.showMoveableTiles());
        this.cancelButton.addEventListener('click', () => this.cancelMove());
    }

    updatePlayerPosition() {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
            tile.classList.remove('player');
            if (parseInt(tile.dataset.x) === this.playerPos.x && 
                parseInt(tile.dataset.y) === this.playerPos.y) {
                tile.classList.add('player');
            }
        });
    }

    showMoveableTiles() {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
            const x = parseInt(tile.dataset.x);
            const y = parseInt(tile.dataset.y);
            const distance = Math.abs(x - this.playerPos.x) + Math.abs(y - this.playerPos.y);
            
            if (distance <= this.moveRange && distance > 0) {
                tile.classList.add('moveable');
            }
        });
        this.moveMode = true;
        this.gameState = 'MOVING';
        this.menu.style.display = 'none';
    }

    handleTileClick(e) {
        const tile = e.target;
        if (!tile.classList.contains('tile')) return;
        
        const x = parseInt(tile.dataset.x);
        const y = parseInt(tile.dataset.y);
        
        if (x === this.playerPos.x && y === this.playerPos.y) {
            this.menu.style.display = 'block';
            this.menu.style.left = e.pageX + 'px';
            this.menu.style.top = e.pageY + 'px';
            this.gameState = 'MENU_OPEN';
        } else if (this.moveMode && tile.classList.contains('moveable')) {
            this.playerPos = {x, y};
            this.updatePlayerPosition();
            this.cancelMove();
        }
    }

    cancelMove() {
        this.moveMode = false;
        this.gameState = 'IDLE';
        this.menu.style.display = 'none';
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => tile.classList.remove('moveable'));
    }
}
  // Initialize the UI panel when the game starts
  window.onload = () => {
      new Game();
      new RightPanelManager();
      new ChatSystem();
  };

  
  