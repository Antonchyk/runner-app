import {Injectable} from '@angular/core';

export interface TimerItem {
  type: string;
  time: number;
  distance: number;
}

export interface ProgramDay {
  name: string;
  timing: TimerItem[];
  isDone: boolean;
}

export interface Program {
  name: string;
  days: ProgramDay[];
}

export interface ProgramDayConfig {
  name: string;
  warmUp: number;
  activity: {
    repeatRunning: {
      run: number;
      walk: number;
      repeat: number;
    };
    longRunning: {
      distance: number;
    }
  };
  warmDown: number;
}

// const RUN_SPEED = 8; // km/h
const MINUTE = 60000;

@Injectable()
export class ProgramsService {
  private program: ProgramDay[];
  private programList: Program[];

  constructor() {
    this.programList = this.getListOfPrograms();
    console.log(this.getDaysFor5K());
  }

  getProgramList(): Program[] {
    return this.programList;
  }

  getProgramByName(name: string): Program {
    return this.programList.find(i => i.name === name);
  }

  getProgramDay(name: string, dayIndex: number) {
    return this.getProgramByName(name).days[dayIndex];
  }

  private getListOfPrograms(): Program[] {
    return [
      {
        name: '5k',
        days: this.getDaysFor5K()
      },
      {
        name: '10k',
        days: [{
          name: 'Day 1',
          timing: [
            {
              type: 'warm_up',
              distance: 0,
              time: 3000
            },
            {
              type: 'long_run',
              distance: 2000,
              time: 0
            }
          ],
          isDone: false
        }]
      }
    ];
  }

  private getDaysFor5K(): ProgramDay[] {
    const programDays = [];
    const config: ProgramDayConfig[] = this.getConfigFor5k();
    config.forEach((item, index) => {
      const day: ProgramDay = {
        name: `Day ${index + 1}`,
        timing: [],
        isDone: false
      };
      if (item.activity.longRunning.distance > 0) {
        day.timing.push(
          {
            type: 'run',
            distance: 0,
            time: 0
          }
        );
      } else {
        for (let i = 0; i < item.activity.repeatRunning.repeat; i++) {
          if (item.activity.repeatRunning.run > 0) {
            day.timing.push(
              {
                type: 'run',
                distance: 0,
                time: item.activity.repeatRunning.run * MINUTE
              }
            );
          }
          if (item.activity.repeatRunning.walk > 0) {
            day.timing.push(
              {
                type: 'walk',
                distance: 0,
                time: item.activity.repeatRunning.walk
              }
            );
          }
        }
      }

      day.timing.unshift({
        type: 'warm_up',
        distance: 0,
        time: item.warmUp
      });

      day.timing.push({
        type: 'warm_down',
        distance: 0,
        time: item.warmDown
      });
      programDays.push(day);
    });
    return programDays;
  }

  private getConfigFor5k(): ProgramDayConfig[] {
    return [
      // region week 1
      {
        name: 'day 1/ week 1',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 1,
            walk: 2,
            repeat: 6
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      {
        name: 'day 2/ week 1',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 1,
            walk: 2,
            repeat: 6
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      {
        name: 'day 3/ week 1',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 1,
            walk: 1,
            repeat: 10
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      // endregion week 1
      // region week 2
      {
        name: 'day 1/ week 2',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 2,
            walk: 3,
            repeat: 5
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      {
        name: 'day 2/ week 2',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 1,
            walk: 1,
            repeat: 10
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      {
        name: 'day 3/ week 2',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 11,
            walk: 0,
            repeat: 1
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      // endregion week 2
      // region week 3
      {
        name: 'day 1/ week 3',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 3,
            walk: 3,
            repeat: 4
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      {
        name: 'day 2/ week 3',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 3,
            walk: 3,
            repeat: 4
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      {
        name: 'day 3/ week 3',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 3,
            walk: 2,
            repeat: 5
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      // endregion week 3
      // region week 4
      {
        name: 'day 1/ week 4',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 5,
            walk: 3,
            repeat: 3
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      {
        name: 'day 2/ week 4',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 5,
            walk: 3,
            repeat: 3
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      {
        name: 'day 3/ week 4',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 15,
            walk: 0,
            repeat: 1
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      // endregion week 4
      // region week 5
      {
        name: 'day 1/ week 5',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 7,
            walk: 2,
            repeat: 3
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      {
        name: 'day 2/ week 5',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 7,
            walk: 2,
            repeat: 3
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      {
        name: 'day 3/ week 5',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 15,
            walk: 0,
            repeat: 1
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      // endregion week 5
      // region week 6
      {
        name: 'day 1/ week 6',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 8,
            walk: 2,
            repeat: 3
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      {
        name: 'day 2/ week 6',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 10,
            walk: 2,
            repeat: 2
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      {
        name: 'day 3/ week 6',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 22,
            walk: 0,
            repeat: 1
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      // endregion week 6
      // region week 7
      {
        name: 'day 1/ week 7',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 12,
            walk: 2,
            repeat: 2
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      {
        name: 'day 2/ week 7',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 12,
            walk: 2,
            repeat: 2
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      {
        name: 'day 3/ week 7',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 22,
            walk: 0,
            repeat: 1
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      // endregion week 7
      // region week 8
      {
        name: 'day 1/ week 8',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 15,
            walk: 2,
            repeat: 2
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      {
        name: 'day 2/ week 8',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 15,
            walk: 2,
            repeat: 2
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      {
        name: 'day 3/ week 8',
        warmUp: 5,
        activity: {
          repeatRunning: {
            run: 37,
            walk: 0,
            repeat: 1
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: 5
      },
      // endregion week 8
    ];
  }

}
