class DroneController {
    constructor() {
        this.isConnected = false;
        this.socket = null;
        this.currentSpeed = 50;
        this.currentAltitude = 10;
        this.batteryLevel = 100;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateTelemetry();
        this.simulateTelemetry();
    }

    bindEvents() {
        // Кнопки подключения
        document.getElementById('connectBtn').addEventListener('click', () => this.connect());
        document.getElementById('disconnectBtn').addEventListener('click', () => this.disconnect());

        // Управление движением
        document.getElementById('forward').addEventListener('click', () => this.sendCommand('forward'));
        document.getElementById('backward').addEventListener('click', () => this.sendCommand('backward'));
        document.getElementById('left').addEventListener('click', () => this.sendCommand('left'));
        document.getElementById('right').addEventListener('click', () => this.sendCommand('right'));
        document.getElementById('stop').addEventListener('click', () => this.sendCommand('stop'));

        // Управление высотой
        document.getElementById('takeoff').addEventListener('click', () => this.sendCommand('takeoff'));
        document.getElementById('land').addEventListener('click', () => this.sendCommand('land'));
        document.getElementById('up').addEventListener('click', () => this.sendCommand('up'));
        document.getElementById('down').addEventListener('click', () => this.sendCommand('down'));

        // Кнопки действий
        document.getElementById('emergencyStop').addEventListener('click', () => this.emergencyStop());
        document.getElementById('returnHome').addEventListener('click', () => this.sendCommand('return_home'));

        // Управление видео
        document.getElementById('startVideo').addEventListener('click', () => this.startVideo());
        document.getElementById('stopVideo').addEventListener('click', () => this.stopVideo());

        // Настройки
        document.getElementById('speed').addEventListener('input', (e) => {
            this.currentSpeed = e.target.value;
            document.getElementById('speedValue').textContent = this.currentSpeed;
            this.sendCommand('set_speed', { speed: this.currentSpeed });
        });

        document.getElementById('altitude').addEventListener('change', (e) => {
            this.currentAltitude = e.target.value;
            this.sendCommand('set_altitude', { altitude: this.currentAltitude });
        });

        // Клавиатурное управление
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    async connect() {
        const ip = document.getElementById('ipAddress').value;
        const port = document.getElementById('port').value;
        
        if (!ip || !port) {
            this.showNotification('Введите IP и порт', 'error');
            return;
        }

        try {
            // Здесь должна быть реальная логика подключения к дрону
            // Например, через WebSocket или HTTP
            this.showNotification('Подключение к дрону...', 'info');
            
            // Имитация подключения
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            this.isConnected = true;
            this.updateConnectionStatus(true);
            this.showNotification('Успешно подключено к дрону!', 'success');
            
            // В реальном приложении здесь будет WebSocket соединение:
            // this.socket = new WebSocket(`ws://${ip}:${port}`);
            // this.socket.onmessage = (event) => this.handleMessage(event.data);
            
        } catch (error) {
            console.error('Connection error:', error);
            this.showNotification('Ошибка подключения', 'error');
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
        }
        
        this.isConnected = false;
        this.updateConnectionStatus(false);
        this.showNotification('Отключено от дрона', 'info');
    }

    sendCommand(command, data = {}) {
        if (!this.isConnected) {
            this.showNotification('Сначала подключитесь к дрону', 'warning');
            return;
        }

        const commandData = {
            command: command,
            timestamp: Date.now(),
            data: data
        };

        console.log('Отправка команды:', commandData);
        
        // В реальном приложении:
        // this.socket.send(JSON.stringify(commandData));
        
        this.showNotification(`Команда "${command}" отправлена`, 'info');
        this.logCommand(command);
    }

    emergencyStop() {
        if (confirm('Вы уверены, что хотите выполнить аварийную остановку?')) {
            this.sendCommand('emergency_stop');
            this.showNotification('Аварийная остановка!', 'error');
        }
    }

    startVideo() {
        this.showNotification('Запуск видеопотока...', 'info');
        // Здесь будет логика запуска видео
        // Например, создание элемента video для потока с камеры
    }

    stopVideo() {
        this.showNotification('Остановка видеопотока', 'info');
        // Остановка видео потока
    }

    handleKeyPress(event) {
        if (!this.isConnected) return;

        switch(event.key) {
            case 'ArrowUp':
                this.sendCommand('forward');
                break;
            case 'ArrowDown':
                this.sendCommand('backward');
                break;
            case 'ArrowLeft':
                this.sendCommand('left');
                break;
            case 'ArrowRight':
                this.sendCommand('right');
                break;
            case ' ':
                this.sendCommand('stop');
                break;
            case 't':
                this.sendCommand('takeoff');
                break;
            case 'l':
                this.sendCommand('land');
                break;
        }
    }

    updateConnectionStatus(connected) {
        const statusDot = document.getElementById('statusDot');
        const statusText = document.getElementById('statusText');
        
        if (connected) {
            statusDot.classList.add('connected');
            statusText.textContent = 'Подключен';
            statusText.style.color = '#2ecc71';
        } else {
            statusDot.classList.remove('connected');
            statusText.textContent = 'Отключен';
            statusText.style.color = '#e74c3c';
        }
    }

    updateTelemetry() {
        // Здесь будет обновление телеметрии с реальными данными
        // Пока что используем случайные значения для демонстрации
        document.getElementById('altitudeValue').textContent = 
            `${(Math.random() * 50).toFixed(1)} м`;
        document.getElementById('speedTelemetry').textContent = 
            `${(Math.random() * 30).toFixed(1)} км/ч`;
        document.getElementById('coordinates').textContent = 
            `${(Math.random() * 100).toFixed(4)}, ${(Math.random() * 100).toFixed(4)}`;
        document.getElementById('temperature').textContent = 
            `${(20 + Math.random() * 10).toFixed(1)}°C`;
    }

    simulateTelemetry() {
        // Симуляция обновления телеметрии
        setInterval(() => {
            if (this.isConnected) {
                this.batteryLevel = Math.max(0, this.batteryLevel - 0.1);
                document.getElementById('batteryLevel').textContent = 
                    `${this.batteryLevel.toFixed(1)}%`;
                this.updateTelemetry();
            }
        }, 3000);
    }

    showNotification(message, type = 'info') {
        // Создаем уведомление
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                               type === 'error' ? 'exclamation-circle' : 
                               type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Добавляем стили
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#2ecc71' : 
                         type === 'error' ? '#e74c3c' : 
                         type === 'warning' ? '#f39c12' : '#3498db'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(notification);
        
        // Удаляем уведомление через 3 секунды
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
        
        // Добавляем CSS анимации
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    logCommand(command) {
        console.log(`[${new Date().toLocaleTimeString()}] Команда: ${command}`);
        // Здесь можно добавить логирование в историю команд
    }
}

// Инициализация контроллера при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.droneController = new DroneController();
});
