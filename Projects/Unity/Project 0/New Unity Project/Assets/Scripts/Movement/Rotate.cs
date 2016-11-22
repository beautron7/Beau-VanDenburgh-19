using UnityEngine;
using System.Collections;

public class Rotate : MonoBehaviour {
    public float spinspeed;
    void Start () {}
    void Update () {
        transform.Rotate(Vector3.up * Time.deltaTime*spinspeed, Space.World);
    }
}