USE railway;

CREATE TABLE IF NOT EXISTS daily_health_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    report_date DATE NOT NULL,
    water_glasses INT DEFAULT 0,
    sleep_hours DECIMAL(4,1) DEFAULT 0,
    exercise_minutes INT DEFAULT 0,
    healthy_meals INT DEFAULT 0,
    health_score INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_report_date (user_id, report_date)
);

SELECT * FROM daily_health_reports ORDER BY id DESC;
