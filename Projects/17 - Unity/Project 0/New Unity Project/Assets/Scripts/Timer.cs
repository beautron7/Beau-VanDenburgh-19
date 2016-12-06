using UnityEngine;
using System.Collections;

public class Timer : MonoBehaviour {
    private float time = 0.0f;
    // Use this for initialization
    void Start () {
    }
	
	// Update is called once per frame
	void Update () {
        time += Time.deltaTime;
        print(Mathf.Floor(time).ToString()+(Mathf.Floor(1000*(time%1))/1000).ToString());
    }
}
