import * as SQLite from 'expo-sqlite';

// Fallback mock data
const mockUsers = [
  { id: 1, mobile_number: '9861370250', name: 'Farmer One', otp: '123456' },
  { id: 2, mobile_number: '9876543211', name: 'Farmer Two', otp: '123456' },
];

let db = null;
let useMockData = true; // Start with mock data by default

export const initDatabase = async () => {
  try {
    // Try to initialize SQLite
    if (SQLite && typeof SQLite.openDatabase === 'function') {
      db = SQLite.openDatabase('mitra.db');
      useMockData = false;
      console.log('Using SQLite database');
      
      return new Promise((resolve) => {
        db.transaction(tx => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              mobile_number TEXT UNIQUE NOT NULL,
              name TEXT,
              otp TEXT,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`,
            [],
            () => {
              console.log('Database initialized successfully');
              resolve(true);
            },
            (_, error) => {
              console.error('Error creating table, falling back to mock data:', error);
              useMockData = true;
              resolve(true);
            }
          );
        });
      });
    } else {
      console.log('SQLite not available, using mock data');
      return Promise.resolve(true);
    }
  } catch (error) {
    console.log('Database initialization failed, using mock data:', error);
    useMockData = true;
    return Promise.resolve(true);
  }
};

// Verify user by mobile number
export const verifyUser = async (mobileNumber) => {
  if (useMockData) {
    console.log('Using mock data for user verification');
    const user = mockUsers.find(u => u.mobile_number === mobileNumber);
    return user || null;
  }

  return new Promise((resolve) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE mobile_number = ?',
        [mobileNumber],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows.item(0));
          } else {
            resolve(null);
          }
        },
        (_, error) => {
          console.error('Error verifying user:', error);
          resolve(null);
        }
      );
    });
  });
};

// Verify OTP
export const verifyOtp = async (mobileNumber, otp) => {
  if (useMockData) {
    console.log('Using mock data for OTP verification');
    const user = mockUsers.find(u => u.mobile_number === mobileNumber && u.otp === otp);
    return user || null;
  }

  return new Promise((resolve) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE mobile_number = ? AND otp = ?',
        [mobileNumber, otp],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows.item(0));
          } else {
            resolve(null);
          }
        },
        (_, error) => {
          console.error('Error verifying OTP:', error);
          resolve(null);
        }
      );
    });
  });
};

// Crop Planning Tables
const createCropPlanTables = () => {
  return new Promise((resolve) => {
    db.transaction(tx => {
      // Crop Plans Table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS crop_plans (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          crop_category TEXT NOT NULL,
          crop_name TEXT NOT NULL,
          crop_value TEXT NOT NULL,
          crop_variety TEXT,
          season TEXT,
          district TEXT NOT NULL,
          region TEXT NOT NULL,
          soil_type TEXT NOT NULL,
          land_size REAL NOT NULL,
          land_unit TEXT NOT NULL,
          planting_date TEXT NOT NULL,
          expected_harvest_date TEXT,
          status TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )`,
        [],
        () => {
          // Activities Table
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS crop_activities (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              plan_id INTEGER NOT NULL,
              name TEXT NOT NULL,
              scheduled_date TEXT NOT NULL,
              icon TEXT NOT NULL,
              importance TEXT NOT NULL,
              completed BOOLEAN DEFAULT 0,
              notes TEXT,
              FOREIGN KEY (plan_id) REFERENCES crop_plans(id)
            )`,
            [],
            () => {
              console.log('Crop planning tables created successfully');
              resolve(true);
            },
            (_, error) => {
              console.error('Error creating activities table:', error);
              resolve(false);
            }
          );
        },
        (_, error) => {
          console.error('Error creating crop plans table:', error);
          resolve(false);
        }
      );
    });
  });
};

// Crop Plan Functions
export const createCropPlan = async (planData) => {
  if (useMockData) {
    console.log('Using mock data for crop plan creation');
    // Store in mock storage for testing
    if (!global.mockCropPlans) global.mockCropPlans = [];
    const newPlan = { id: Date.now(), ...planData };
    global.mockCropPlans.push(newPlan);
    return newPlan;
  }

  return new Promise((resolve) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO crop_plans (
          user_id, crop_category, crop_name, crop_value,
          district, land_size, land_unit,
          planting_date, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          planData.userId,
          planData.crop_category,
          planData.crop_name,
          planData.crop_value,
          planData.district,
          planData.land_size,
          planData.land_unit,
          planData.planting_date,
          planData.status
        ],
        (_, { insertId }) => {
          resolve({ id: insertId, ...planData });
        },
        (_, error) => {
          console.error('Error creating crop plan:', error);
          resolve(null);
        }
      );
    });
  });
};

export const getAllCropPlans = async (userId = null) => {
  if (useMockData) {
    console.log('Using mock data for getting crop plans');
    return global.mockCropPlans || [];
  }

  return new Promise((resolve) => {
    const query = userId 
      ? 'SELECT * FROM crop_plans WHERE user_id = ? ORDER BY created_at DESC'
      : 'SELECT * FROM crop_plans ORDER BY created_at DESC';
    const params = userId ? [userId] : [];

    db.transaction(tx => {
      tx.executeSql(
        query,
        params,
        (_, { rows }) => {
          const plans = [];
          for (let i = 0; i < rows.length; i++) {
            plans.push(rows.item(i));
          }
          resolve(plans);
        },
        (_, error) => {
          console.error('Error getting crop plans:', error);
          resolve([]);
        }
      );
    });
  });
};

export const getCropPlans = async (userId, status = null) => {
  if (useMockData) {
    console.log('Using mock data for crop plans');
    // Return from mock storage
    const plans = global.mockCropPlans || [];
    return status 
      ? plans.filter(p => p.userId === userId && p.status === status)
      : plans.filter(p => p.userId === userId);
  }

  return new Promise((resolve) => {
    db.transaction(tx => {
      const query = status
        ? 'SELECT * FROM crop_plans WHERE user_id = ? AND status = ? ORDER BY created_at DESC'
        : 'SELECT * FROM crop_plans WHERE user_id = ? ORDER BY created_at DESC';
      const params = status ? [userId, status] : [userId];

      tx.executeSql(
        query,
        params,
        async (_, { rows }) => {
          const plans = rows._array;
          
          // Fetch activities for each plan
          const plansWithActivities = await Promise.all(
            plans.map(plan => new Promise((resolveActivities) => {
              tx.executeSql(
                'SELECT * FROM crop_activities WHERE plan_id = ?',
                [plan.id],
                (_, { rows: activityRows }) => {
                  resolveActivities({
                    ...plan,
                    activities: activityRows._array || []
                  });
                },
                (_, error) => {
                  console.error('Error fetching activities:', error);
                  resolveActivities(plan);
                }
              );
            }))
          );
          
          resolve(plansWithActivities);
        },
        (_, error) => {
          console.error('Error fetching crop plans:', error);
          resolve([]);
        }
      );
    });
  });
};

// Add a function to get all activities for the calendar
export const getAllActivities = async (userId) => {
  if (useMockData) {
    console.log('Using mock data for activities');
    const plans = global.mockCropPlans || [];
    return plans
      .filter(p => p.userId === userId)
      .flatMap(plan => (plan.activities || []).map(activity => ({
        ...activity,
        planId: plan.id,
        planName: plan.crop_name
      })));
  }

  return new Promise((resolve) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT 
          a.*, p.crop_name as plan_name, p.id as plan_id
         FROM crop_activities a
         JOIN crop_plans p ON a.plan_id = p.id
         WHERE p.user_id = ?
         ORDER BY a.scheduled_date ASC`,
        [userId],
        (_, { rows }) => {
          resolve(rows._array || []);
        },
        (_, error) => {
          console.error('Error fetching activities:', error);
          resolve([]);
        }
      );
    });
  });
};

export const updateCropPlanStatus = async (planId, status) => {
  if (useMockData) {
    console.log('Using mock data for status update');
    return true;
  }

  return new Promise((resolve) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE crop_plans SET status = ? WHERE id = ?',
        [status, planId],
        () => resolve(true),
        (_, error) => {
          console.error('Error updating plan status:', error);
          resolve(false);
        }
      );
    });
  });
};

export const deleteCropPlan = async (planId) => {
  if (useMockData) {
    console.log('Using mock data for plan deletion');
    return true;
  }

  return new Promise((resolve) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM crop_activities WHERE plan_id = ?',
        [planId],
        () => {
          tx.executeSql(
            'DELETE FROM crop_plans WHERE id = ?',
            [planId],
            () => resolve(true),
            (_, error) => {
              console.error('Error deleting crop plan:', error);
              resolve(false);
            }
          );
        },
        (_, error) => {
          console.error('Error deleting activities:', error);
          resolve(false);
        }
      );
    });
  });
};

export const getCropActivities = async (planId) => {
  if (useMockData) {
    console.log('Using mock data for crop activities');
    return [];
  }

  return new Promise((resolve) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM crop_activities WHERE plan_id = ? ORDER BY scheduled_date ASC',
        [planId],
        (_, { rows }) => {
          const activities = [];
          for (let i = 0; i < rows.length; i++) {
            activities.push(rows.item(i));
          }
          resolve(activities);
        },
        (_, error) => {
          console.error('Error fetching activities:', error);
          resolve([]);
        }
      );
    });
  });
};

export const updateActivityStatus = async (activityId, completed) => {
  if (useMockData) {
    console.log('Using mock data for activity status update');
    return true;
  }

  return new Promise((resolve) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE crop_activities SET completed = ? WHERE id = ?',
        [completed ? 1 : 0, activityId],
        () => {
          resolve(true);
        },
        (_, error) => {
          console.error('Error updating activity status:', error);
          resolve(false);
        }
      );
    });
  });
};

export const addActivity = async (planId, activity) => {
  if (useMockData) {
    console.log('Using mock data for adding activity');
    return { id: 1, ...activity };
  }

  return new Promise((resolve) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO crop_activities (
          plan_id, name, scheduled_date, icon, importance, completed, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          planId,
          activity.name,
          activity.scheduled_date,
          activity.icon,
          activity.importance,
          activity.completed ? 1 : 0,
          activity.notes || null
        ],
        (_, { insertId }) => {
          resolve({ id: insertId, ...activity });
        },
        (_, error) => {
          console.error('Error adding activity:', error);
          resolve(null);
        }
      );
    });
  });
};

// Update the database object
const database = {
  initDatabase,
  verifyUser,
  verifyOtp,
  createCropPlan,
  getCropPlans,
  updateCropPlanStatus,
  deleteCropPlan,
  getCropActivities,
  updateActivityStatus,
  addActivity,
  getAllActivities,
  getAllCropPlans,
};

export default database; 