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
        days: []
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
        day.timing.push({
          type: 'long run',
          distance: item.activity.longRunning.distance,
          time: 0
        });
      } else {
        for (let i = 0; i < item.activity.repeatRunning.repeat; i++) {
          day.timing.push(
            {
              type: 'run',
              distance: 0,
              time: item.activity.repeatRunning.run
            },
            {
              type: 'walk',
              distance: 0,
              time: item.activity.repeatRunning.walk
            }
          );
        }
      }

      day.timing.unshift({
        type: 'warm up',
        distance: 0,
        time: item.warmUp
      });

      day.timing.push({
        type: 'warm down',
        distance: 0,
        time: item.warmDown
      });
      programDays.push(day);
    });
    return programDays;
  }

  private getConfigFor5k(): ProgramDayConfig[] {
    const MINUTE = 60000;
    return [
      // region week 1
      {
        name: 'day 1/ week 1',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: MINUTE,
            walk: MINUTE * 2,
            repeat: 6
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: MINUTE * 5
      },
      {
        name: 'day 2/ week 1',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: MINUTE,
            walk: MINUTE * 2,
            repeat: 6
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: MINUTE * 5
      },
      {
        name: 'day 3/ week 1',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: MINUTE,
            walk: MINUTE,
            repeat: 10
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: MINUTE * 5
      },
      // endregion week 1
      // region week 2
      {
        name: 'day 1/ week 2',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: MINUTE * 2,
            walk: MINUTE * 3,
            repeat: 5
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: MINUTE * 5
      },
      {
        name: 'day 2/ week 2',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: MINUTE,
            walk: MINUTE,
            repeat: 10
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: MINUTE * 5
      },
      {
        name: 'day 3/ week 2',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: 0,
            walk: 0,
            repeat: 0
          },
          longRunning: {
            distance: 1500
          }
        },
        warmDown: MINUTE * 5
      },
      // endregion week 2
      // region week 3
      {
        name: 'day 1/ week 3',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: MINUTE * 3,
            walk: MINUTE * 3,
            repeat: 4
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: MINUTE * 5
      },
      {
        name: 'day 2/ week 3',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: MINUTE * 3,
            walk: MINUTE * 3,
            repeat: 4
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: MINUTE * 5
      },
      {
        name: 'day 3/ week 3',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: MINUTE * 3,
            walk: MINUTE * 2,
            repeat: 5
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: MINUTE * 5
      },
      // endregion week 3
      // region week 4
      {
        name: 'day 1/ week 4',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: MINUTE * 5,
            walk: MINUTE * 3,
            repeat: 3
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: MINUTE * 5
      },
      {
        name: 'day 2/ week 4',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: MINUTE * 5,
            walk: MINUTE * 3,
            repeat: 3
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: MINUTE * 5
      },
      {
        name: 'day 3/ week 4',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: 0,
            walk: 0,
            repeat: 0
          },
          longRunning: {
            distance: 2000
          }
        },
        warmDown: MINUTE * 5
      },
      // endregion week 4
      // region week 5
      {
        name: 'day 1/ week 5',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: MINUTE * 7,
            walk: MINUTE * 2,
            repeat: 3
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: MINUTE * 5
      },
      {
        name: 'day 2/ week 5',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: MINUTE * 7,
            walk: MINUTE * 2,
            repeat: 3
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: MINUTE * 5
      },
      {
        name: 'day 3/ week 5',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: 0,
            walk: 0,
            repeat: 0
          },
          longRunning: {
            distance: 2000
          }
        },
        warmDown: MINUTE * 5
      },
      // endregion week 5
      // region week 6
      {
        name: 'day 1/ week 6',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: MINUTE * 8,
            walk: MINUTE * 2,
            repeat: 3
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: MINUTE * 5
      },
      {
        name: 'day 2/ week 6',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: MINUTE * 10,
            walk: MINUTE * 2,
            repeat: 2
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: MINUTE * 5
      },
      {
        name: 'day 3/ week 6',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: 0,
            walk: 0,
            repeat: 0
          },
          longRunning: {
            distance: 3000
          }
        },
        warmDown: MINUTE * 5
      },
      // endregion week 6
      // region week 7
      {
        name: 'day 1/ week 7',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: MINUTE * 12,
            walk: MINUTE * 2,
            repeat: 2
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: MINUTE * 5
      },
      {
        name: 'day 2/ week 7',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: MINUTE * 12,
            walk: MINUTE * 2,
            repeat: 2
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: MINUTE * 5
      },
      {
        name: 'day 3/ week 7',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: 0,
            walk: 0,
            repeat: 0
          },
          longRunning: {
            distance: 3000
          }
        },
        warmDown: MINUTE * 5
      },
      // endregion week 7
      // region week 8
      {
        name: 'day 1/ week 8',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: MINUTE * 15,
            walk: MINUTE * 2,
            repeat: 2
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: MINUTE * 5
      },
      {
        name: 'day 2/ week 8',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: MINUTE * 15,
            walk: MINUTE * 2,
            repeat: 2
          },
          longRunning: {
            distance: 0
          }
        },
        warmDown: MINUTE * 5
      },
      {
        name: 'day 3/ week 8',
        warmUp: MINUTE * 5,
        activity: {
          repeatRunning: {
            run: 0,
            walk: 0,
            repeat: 0
          },
          longRunning: {
            distance: 5000
          }
        },
        warmDown: MINUTE * 5
      },
      // endregion week 8
    ];
  }

}
